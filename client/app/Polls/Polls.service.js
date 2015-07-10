'use strict';

angular.module('basejumpsApp')
  .factory('Polls', ['$http', function ($http) {
    var p = {};

    var get_polls = function(id, cb){
      $http({
        method:'get',
        url: '/api/polls/',
        data:id
      }).success(function(data){
        cb(null, data);
      }).error(function(err){
        cb(err);
      })
    };
    return {


      createPoll: function (poll, cb) {
        $http({
          method: 'post',
          url: '/api/polls/',
          data: poll
        }).success(function (response) {
          cb(null, response);
        }).error(function (err) {
          cb(err);
        })
      },
      deletePolls: function (id, cb) {
        $http({
          method: 'delete',
          url: '/api/polls/',
          data: id
        }).success(function (data) {
          cb(null, data);
        }).error(function (err) {
          cb(err);
        })
      },

      loadCommunity: function (cb) {
        return get_polls(null, cb);
      },

      getPoll: function (id, cb) {
        return get_polls(id, cb);
      }
    };
  }]);
