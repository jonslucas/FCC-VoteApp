'use strict';

angular.module('basejumpsApp')
  .controller('MainCtrl', function ($scope, Polls) {
    var printVars = function() {
      console.log('showCreate: '+$scope.showCreate);
      console.log('showOwn: '+$scope.showOwn);
    };
    Polls.loadCommunity(function(err, resp) {
      if(err){return console.error(err);}
      $scope.community = resp;
    });
    $scope.choices= [
      {name:''},
      {name:''}
    ];
    $scope.showCreate = false;
    $scope.showOwn = true;
    $scope.getCreate = function() {
      console.log('getCreate');
      console.log('before');
      printVars();
      $scope.showOwn=false;
      $scope.showCreate=true;
      console.log('after');
      printVars();
    };
    $scope.getOwn = function() {
      console.log('getOwn');
      console.log('before');
      printVars();
      $scope.showCreate = false;
      $scope.showOwn = true;
      console.log('after');
      printVars();
      Polls.getUserPolls(function(err, data){
        if(err){ return console.error(err); }
        $scope.polls = data;
      });
    };
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
