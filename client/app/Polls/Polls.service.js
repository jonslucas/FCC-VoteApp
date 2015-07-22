'use strict';

angular.module('basejumpsApp')
  .factory('Polls', ['$http', 'Auth', function ($http, Auth) {
    var p = {};

    var get_comments = function(id, cb){
      $http({
        method:'get',
        url: '/api/comments/',
        params:{id: id}
      }).success(function(data){
        cb(null, data);
      }).error(function(err){
        cb(err);
      });
      //cb(null, 'None');
    };

    var parsePoll = function(data) {
      return data.map(function (poll) {
        var chart = {
          labels: [],
          data: []
        };
        var user = Auth.getCurrentUser()._id;
        poll.choices.forEach(function (choice) {
          chart.labels.push(choice.choice);
          chart.data.push(choice.votes);
        });
        poll.voted = poll.voters.reduce(function(acc, curr) {
          if(curr===user) return true;
          else return acc;
        }, false);
        return {
          poll: poll,
          chart: chart
        };
      });
    };

    var get_polls = function(id, cb){
      var config= {
        method: 'get',
        url: '/api/polls/'
      };
      if(id){
        config.params = {id: id};
      }
      $http(config).success(function(data){
        var parsed = parsePoll(data);
        var output = parsed.map(function(elem){
          get_comments(elem.poll._id, function(err, resp){
            if(err){ return console.error(err); }
            cb(null, {
              poll: elem.poll,
              comments:resp,
              chart: elem.chart
            });
          });

        });

      }).error(function(err){
        cb(err);
      })
    };
    return {

      vote: function(poll, cb) {
        if(poll.poll.voted) { delete poll.poll.voted; }
        poll.poll.voters.push(Auth.getCurrentUser()._id);
        //console.log('choices: '+JSON.stringify(poll.poll.choices));
        //console.log('poll: '+JSON.stringify(poll));
        //console.log('author: '+JSON.stringify(poll.poll.author));
        //console.log('authorId: '+poll.poll.author.id);
        //poll.poll.author = poll.poll.author._id;
        $http.put('/api/polls/'+poll.poll._id, poll.poll)
          .success(function (resp) {
          cb(null, parsePoll([resp]));
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
