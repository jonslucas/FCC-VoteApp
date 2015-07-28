'use strict';

angular.module('basejumpsApp')
  .controller('UserPollCtrl', function ($scope, $stateParams, Polls) {
    Polls.getUserPoll($stateParams.user, $stateParams.poll, function(err, poll){
      //if(err) { return console.error(err); }
      $scope.poll = poll;
    });
  });
