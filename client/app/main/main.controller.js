'use strict';

angular.module('basejumpsApp')
  .controller('MainCtrl', function ($scope, Polls) {
    $scope.polls = [];
    $scope.showDash = false;


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
