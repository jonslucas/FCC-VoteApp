'use strict';

angular.module('basejumpsApp')
  .directive('userDashboard', function () {
    return {
      templateUrl: 'app/userDashboard/userDashboard.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });