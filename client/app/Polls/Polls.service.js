'use strict';

angular.module('basejumpsApp')
  .factory('Polls', '$http', function ($http) {
    // Service logic
    // ...
    var get_polls = function(cb){
      $http({
        method:'get',
        url: '/api/polls/'
      }).success(function(data){
        cb(null, data);
      }).error(function(err){
        cb(err);
      })
    };
    var create_poll = function(poll, cb){
      $http({
        method:'post',
        url:'/api/polls/',
        data: poll
      }).success(function(response){
        cb(null, response);
      }).error(function(err){
        cb(err);
      })
    };
    // Public API here
    return {
      someMethod: function () {
        return meaningOfLife;
      }
    };
  });
