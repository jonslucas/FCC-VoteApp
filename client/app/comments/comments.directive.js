'use strict';

var commCtrl = function($scope, Polls) {
  var ctrl = this;
  ctrl.showCreateComm = false;
  ctrl.getComments = function (poll) {
    Polls.getComms(poll.poll._id, function(err, resp){
      if(err) { return console.error(err); }
      ctrl.comments = resp;
      console.log('getComments poll: '+JSON.stringify($scope.poll));
    })
  };
  ctrl.getComments($scope.poll);
  ctrl.createComment = function () {
    ctrl.showCreateComm = ctrl.showCreateComm===true?false:true;
  };
  ctrl.postComment = function () {
    if(!ctrl.inputComment){ return; }
    var poll = $scope.poll,
      comment= ctrl.inputComment;
    var c = {
      body:comment,
      poll: poll.poll._id
    };
    ctrl.inputComment = null;
    console.log('before create poll: '+JSON.stringify($scope.poll));
    Polls.createComm({poll: poll.poll, comment: c}, function(err, resp){
      if(err) { return console.error(err); }
      console.log('resp from createComm: '+JSON.stringify(resp));
      console.log('after create, before getComms poll: '+JSON.stringify($scope.poll));
      ctrl.getComments(poll);
    });
  };

};

angular.module('basejumpsApp')
  .directive('comments', function () {
    return {
      templateUrl: 'app/comments/comments.html',
      restrict: 'EA',
      scope: {
        poll: '=data'
      },
      controller: commCtrl,
      controllerAs: 'ctrl'
    };
  });
