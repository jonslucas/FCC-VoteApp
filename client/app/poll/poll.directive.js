'use strict';


angular.module('basejumpsApp')
  .directive('poll', function () {
    return {
      templateUrl: 'app/poll/poll.html',
      restrict: 'EA',
      scope: {
        poll: '=data'
      }
    };
  });
