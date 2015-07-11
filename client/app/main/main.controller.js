'use strict';

angular.module('basejumpsApp')
  .controller('MainCtrl', function ($scope, Polls) {
    Polls.loadCommunity(function(err, resp) {
      if(err){return console.error(err);}
      $scope.community = resp;
    });

    $scope.savePoll = function(){
      console.log('createButton clicked');
      console.log('subject: '+$scope.subject);
      console.log('1st option: '+$scope.option1);
      console.log('2nd option: '+$scope.option2);
      if(!$scope.subject || !$scope.option1 || !$scope.option2) {return;}
      else {
        var choices = [{
          choice: $scope.option1,
          votes: 0
        },{
          choice: $scope.option2,
          votes:0
        }];
        var poll = {
          question: $scope.subject,
          choices: choices,
          active: true
        };
        console.log(JSON.stringify(poll));
        Polls.createPoll(poll, function(err, resp){
          if(err) {return console.error(err);}
          console.log('no error');
          console.log(resp);
        });

    };
    $scope.message = 'Hello';
  });
