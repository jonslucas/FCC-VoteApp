'use strict';

angular.module('basejumpsApp')
  .controller('MainCtrl', function ($scope, Polls) {
    Polls.loadCommunity(function(err, resp) {
      if(err){return console.error(err);}
      $scope.community = resp;
    });
    $scope.choices= [
      {name:''},
      {name:''}
    ];
    $scope.addChoice = function() {
      $scope.choices.push({name:''});
    };
    $scope.removeChoice= function(ind) {
      $scope.choices.splice(ind,1);
    };
    $scope.savePoll = function(){
      var optCheck = true;
      $scope.choices.forEach(function(curr){
        if(curr.name === '') return false;
      });
      if(!$scope.subject || !optCheck) {return;}
      else {
        var choices = $scope.choices.map(function(elem) {
          return {
            choice: elem.name,
            votes: 0
          };
        });
        var poll = {
          question: $scope.subject,
          choices: choices,
          active: true
        };
        console.log(JSON.stringify(poll));
        Polls.createPoll(poll, function (err, resp) {
          if (err) {
            return console.error(err);
          }
          console.log('no error');
          console.log(resp);
        });
      }
    };

  });
