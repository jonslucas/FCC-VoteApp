'use strict';

var _ = require('lodash');
var Polls = require('./polls.model');

// Get list of polls
exports.index = function(req, res) {
  Polls.loadCommunity(function (err, polls) {
    if(err) { return handleError(res, err); }
    return res.json(200, polls);
  });
};

// Get a single polls
exports.show = function(req, res) {
  Polls.findById(req.params.id, function (err, polls) {
    if(err) { return handleError(res, err); }
    if(!polls) { return res.send(404); }
    return res.json(polls);
  });
};
//Get own polls for authenticated user
exports.getBatch = function(req, res) {
  Polls.find({author:req.user._id}, function(err, polls){
    if(err) { return handleError(res, err); }
    if(!polls) { return res.send(404); }
    return res.json(polls);
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
  console.log('req.params.id: '+req.params.id);

  if(req.body._id) { console.log('body._id: '+req.body._id); delete req.body._id; }
  Polls.findById(req.params.id, function (err, polls) {
    if (err) { return handleError(res, err); }
    if(!polls) { return res.send(404); }
    console.log('response from find: '+JSON.stringify(polls));
    //var updated = _.merge(polls, req.body);
    var extended = _.extend(polls, req.body);
    console.log('poll passed in: '+JSON.stringify(req.body));
    console.log('extended: '+JSON.stringify(extended));
    console.log('author(req.body): '+JSON.stringify(req.body.author));
    extended.save(function (err) {
      if (err) { return handleError(res, err); }
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
