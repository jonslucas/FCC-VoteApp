'use strict';

var commCtrl = function($scope, Polls) {
  var ctrl = this;
  ctrl.showCreateComm = false;
  ctrl.disqusUrl = 'https://mysterious-atoll-1051.herokuapp.com/'+$scope.poll.poll.author.name+'/'+$scope.poll.poll.question;
  ctrl.getComments = function (poll) {
    Polls.getComms(poll.poll._id, function(err, resp){
      if(err) { return console.error(err); }
      ctrl.comments = resp;

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
    Polls.createComm({poll: poll.poll, comment: c}, function(err, resp){
      if(err) { return console.error(err); }
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
