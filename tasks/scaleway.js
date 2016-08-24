(function() {
  'use strict';
  
  module.exports = function(grunt) {
    grunt.registerMultiTask('scaleway', 'Scaleway tasks', function() {
      var done = this.async();

      var Api = require('scaleway');
      var client = new Api({token: this.data.token });
      
      switch (this.data.action) {
        case 'find-server':
          var serverName = this.data.name;
          var configKey = this.name + ':' + this.target + ':server';
          client.get('/servers').catch(function (err) {
              grunt.log.error(err);
              done(false);
            })
            .then(function(res) {
              var servers = res.body.servers;
              var server = null;
              
              for (var i = 0, l = servers.length; i < l; i++) {
                var server = servers[i];
                var name = server.name;
                if (name == serverName) {
                  server = server;
                  break;
                }
              }
              
              if (server) {
                grunt.config.set(configKey, server);
                done();
              } else {
                grunt.log.error('Could not find scaleway server by name ' + serverName);
                done(false);
              }
            });
        break;
      }
      
    });
  };
  
}).call(this);