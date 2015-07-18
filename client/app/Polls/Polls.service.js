'use strict';

angular.module('basejumpsApp')
  .factory('Polls', ['$http', function ($http) {
    var p = {};

    var parsePoll = function(data) {
      return data.map(function (poll) {
        var chart = {
          labels: [],
          data: [3, 9]
        };
        poll.choices.forEach(function (choice) {
          chart.labels.push(choice.choice);
          chart.data.push(choice.votes);
        });
        return {
          poll: poll,
          chart: chart
        };
      });
    };

    var get_polls = function(id, cb){
      $http({
        method:'get',
        url: '/api/polls/',
        data:id
      }).success(function(data){
        cb(null, parsePoll(data));
      }).error(function(err){
        cb(err);
      })
    };
    return {

      vote: function(poll, cb) {
        $http.put('/api/polls/', poll)
          .success(function (resp) {
          cb(null, resp);
        }).error(function (err) {
          cb(err);
        })
      },

      createPoll: function (poll, cb) {
        $http({
          method: 'post',
          url: '/api/polls/',
          data: poll
        }).success(function (response) {
          cb(null, response);
        }).error(function(err){
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

      getUserPolls: function(cb) {
        $http({
          method:'get',
          url: '/api/polls/user/'
        }).success(function(data){
          cb(null, parsePoll(data));
        }).error(function(err){
          cb(err);
        });
      },

      loadCommunity: function (cb) {
        return get_polls(null, cb);
      },

      getPoll: function (id, cb) {
        return get_polls(id, cb);
      }
    };
  }]);
