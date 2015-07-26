'use strict';

angular.module('basejumpsApp')
  .controller('MainCtrl', function ($scope, Polls) {
    $scope.polls = [];
    $scope.showDash = false;
    $scope.voteChoice= {
      name:null
    };
    $scope.showCreateComm = false;
    $scope.getComments = function (ind) {
      var poll = $scope.polls[ind];

      Polls.getComms(poll.poll._id, function(err, resp){
        if(err) { return console.error(err); }
        $scope.polls[ind].comments = resp;
      })
    };
    $scope.createComment = function () {
      $scope.showCreateComm = $scope.showCreateComm===true?false:true;
    };
    $scope.postComment = function (ind, comment) {
      var poll = $scope.polls[ind];
      var c = {
        body:comment,
        poll: poll.poll._id
      };
      Polls.createComm({poll: poll.poll, comment: c}, function(err, resp){
        $scope.getComments(ind);
      });
    };
    $scope.vote = function(pollInd) {
      if($scope.voteChoice.name) {
        var poll = $scope.polls[pollInd],
          choice = poll.poll.choices[$scope.voteChoice.name];
        choice.votes += 1;
        poll.chart.data[$scope.voteChoice.name]+=1;
        poll.poll.voted=true;
        Polls.vote(poll, function(err, resp) {
          if(err){ return console.error(err); }
          $scope.polls[pollInd] = resp;
        });
      }

    };
    $scope.showDashboard = function(){
      $scope.showDash = $scope.showDash===true?false:true;
    };
    var getComm = function() {
      Polls.loadCommunity(function(err, resp){
        if(err){return console.error(err);}
        $scope.polls.push(resp);
      });
    };
    getComm();



  });
