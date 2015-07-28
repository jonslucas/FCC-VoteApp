'use strict';

var dashCtrl = function(Polls) {
  var ctrl = this;
  var printVars = function() {
    console.log('showCreate: '+ctrl.showCreate);
    console.log('showOwn: '+ctrl.showOwn);
  };
  ctrl.choices= [
    {name:''},
    {name:''}
  ];
  ctrl.showCreate = false;
  ctrl.showOwn = true;
  ctrl.deletePoll = function(ind) {
    var poll = ctrl.polls[ind];
    if(window.confirm())
    Polls.deletePolls(poll.poll._id, function (err, resp) {
      if(err) { return console.error(err); }
      console.log('resp: '+JSON.stringify(resp));
    });
  };
  ctrl.getCreate = function() {
    ctrl.showOwn=false;
    ctrl.showCreate=true;
  };
  ctrl.getOwn = function() {
    ctrl.showCreate = false;
    ctrl.showOwn = true;
    Polls.getOwnPolls(function(err, data){
      if(err){ return console.error(err); }
      ctrl.polls = data.map(function(d){
        return {
          poll: d.poll,
          chart: d.chart
        };
      })
    });
  };
  ctrl.addChoice = function() {
    if(ctrl.choices.length<9){
      ctrl.choices.push({name:''});
    }

  };
  ctrl.removeChoice= function(ind) {
    ctrl.choices.splice(ind,1);
  };
  ctrl.savePoll = function(){
    var optCheck = true;
    ctrl.choices.forEach(function(curr){
      if(curr.name === '') return false;
    });
    if(!ctrl.subject || !optCheck) {return;}
    else {
      var choices = ctrl.choices.map(function(elem) {
        return {
          choice: elem.name,
          votes: 0
        };
      });
      var poll = {
        question: ctrl.subject,
        choices: choices,
        active: true
      };
      Polls.createPoll(poll, function (err, resp) {
        if (err) {
          return console.error(err);
        }
        console.log('no error');
        console.log(resp);
        ctrl.subject='';
        ctrl.choices = [{name:''},{name:''}];
      });
    }
  };
};


angular.module('basejumpsApp')
  .directive('userDashboard', function () {
    return {
      templateUrl: 'app/userDashboard/userDashboard.html',
      restrict: 'EA',
      controller: dashCtrl,
      controllerAs: 'dCtrl',
      link: function (scope, element, attrs) {
      }
    };
  });
