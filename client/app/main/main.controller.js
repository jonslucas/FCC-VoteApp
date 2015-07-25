'use strict';

angular.module('basejumpsApp')
  .controller('MainCtrl', function ($scope, Polls) {
    var poll;
    $scope.polls = [];
    $scope.showDash = false;
    $scope.voteChoice= {
      name:null
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
