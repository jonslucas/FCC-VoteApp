'use strict';

var _ = require('lodash');
var Polls = require('./polls.model');
var User = require('../user/user.model');

// Get list of polls
exports.index = function(req, res) {
  Polls.loadCommunity(function (err, polls) {
    if(err) { return handleError(res, err); }
    return res.json(200, polls);
  });
};

// Get a single polls
exports.show = function(req, res) {
  Polls.loadPoll(req.params.id, function (err, polls) {
    if(err) { return handleError(res, err); }
    if(!polls) { return res.send(404); }
    return res.json(polls);
  });
};
//Get own polls for authenticated user
exports.getUserBatch = function(req, res) {
  User.find({name: req.params.user}, function(err, user){
    if(err) { return console.error(err); }
    if(!user) { return res.send(404); }
    Polls.find({author:user[0]._id}, function(err, polls){
      if(err) { return handleError(res, err); }
      if(!polls) { return res.send(404); }
      polls.author = {_id: user[0]._id, name: user[0].name};
      return res.json(polls);
    });
  });

};

exports.getUserPoll = function(req, res) {
  User.find({name: req.params.user}, function (err, user) {
    if(err) { return console.error(err); }
    if(!user) { return res.send(404); }
    Polls.loadPollByUserQuestion(user[0]._id, req.params.poll, function (err, poll) {
      if(err) { return handleError(res, err); }
      if(!poll) { return res.send(404); }
      return res.json(poll);
    });
  });
};

// Creates a new polls in the DB.
exports.create = function(req, res) {
  var poll = new Polls(_.merge({author:req.user._id}, req.body));
  poll.save(req.body, function(err, polls) {
    if(err) {
      return handleError(res, err);
    }
  });
  return res.json(201, poll._id);
};

// Updates an existing polls in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Polls.findById(req.params.id, function (err, polls) {
    if (err) { return handleError(res, err); }
    if(!polls) { return res.send(404); }
    delete req.body.author;
    var extended = _.extend(polls, req.body);
    console.log('extended: '+JSON.stringify(extended));
    extended.save(function (err) {
      if (err) { console.log(err); return handleError(res, err); }
      return res.json(200, polls);
    });
  });
};

// Deletes a polls from the DB.
exports.destroy = function(req, res) {
  Polls.findById(req.params.id, function (err, polls) {
    if(err) { return handleError(res, err); }
    if(!polls) { return res.send(404); }
    polls.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
