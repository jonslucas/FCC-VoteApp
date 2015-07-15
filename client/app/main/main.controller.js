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
      $scope.showOwn=false;
      $scope.showCreate=true;
    };
    $scope.getOwn = function() {
      $scope.showCreate = false;
      $scope.showOwn = true;
      Polls.getUserPolls(function(err, data){
        if(err){ return console.error(err); }
        $scope.polls = data.map(function(poll){
          var chart = {
            id:'base',
            class: 'chart-base',
            type: 'Pie',
            labels: [],
            data: []
          };
          poll.choices.forEach(function (choice) {
            chart.labels.push(choice.choice);
            chart.data.push(choice.votes);
          });
          return {
            question: poll.question,
            chart: chart
          };
        })
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
        Polls.createPoll(poll, function (err, resp) {
          if (err) {
            return console.error(err);
          }
          console.log('no error');
          console.log(resp);
          $scope.subject='';
          $scope.choices = [{name:''},{name:''}];
        });
      }
    };

  });
