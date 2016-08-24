(function() {
  'use strict';
  
  module.exports = function(grunt) {
    grunt.registerMultiTask('scaleway', 'Scaleway tasks', function() {
      var done = this.async();

      var Api = require('scaleway');
      var client = new Api({token: this.data.token });
      
      switch (this.data.action) {
        case 'find-server':
          
          client.get('/servers', function(err, res) {
            if (err) {
              grunt.log.error(err);
              done(false);
            } else {
              var servers = res.body.servers;
              var server = null;
              
              for (var i = 0, l = servers.length; i < l; i++) {
                var server = servers[i];
                var name = server.name;
                if (name == this.data.name) {
                  server = server;
                  break;
                }
              }
              
              if (server) {
                grunt.config.set(this.name + ':' + this.target + ':server', server);
                done();
              } else {
                grunt.log.error('Could not find scaleway server by name ' + this.data.name);
                done(false);
              }
            }
          }.bind(this));
        break;
      }
      
    });
  };
  
}).call(this);