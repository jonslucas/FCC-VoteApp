'use strict';

angular.module('basejumpsApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('userPoll', {
        url: '/:user/:poll',
        templateUrl: 'app/userPoll/userPoll.html',
        controller: 'UserPollCtrl'
      });
  });