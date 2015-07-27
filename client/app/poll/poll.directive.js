'use strict';

var ctrl = function($scope, Polls) {
  var ctrl = this;
  ctrl.voteChoice= {
    name:null
  };

  ctrl.vote = function() {
    if(ctrl.voteChoice.name) {
      var poll = $scope.poll,
        choice = poll.poll.choices[ctrl.voteChoice.name];
      choice.votes += 1;
      poll.chart.data[ctrl.voteChoice.name]+=1;
      poll.poll.voted=true;
      Polls.vote(poll, function(err, resp) {
        if(err){ return console.error(err); }
        console.log('resp: '+JSON.stringify(resp));
        $scope.poll = resp;
      });
    }

  };
};

angular.module('basejumpsApp')
  .directive('poll', function () {
    return {
      templateUrl: 'app/poll/poll.html',
      restrict: 'EA',
      scope: {
        poll: '=data'
      },
      controller: ctrl,
      controllerAs: 'ctrl'
    };
  });
