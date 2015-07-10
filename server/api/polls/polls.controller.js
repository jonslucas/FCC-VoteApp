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

// Creates a new polls in the DB.
exports.create = function(req, res) {

  var poll = new Polls(_.merge({author:req.user._id}, req.body));
  poll.create(req.body, function(err, polls) {
    if(err) { return handleError(res, err); }
    return res.json(201, polls);
  });
};

// Updates an existing polls in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Polls.findById(req.params.id, function (err, polls) {
    if (err) { return handleError(res, err); }
    if(!polls) { return res.send(404); }
    var updated = _.merge(polls, req.body);
    updated.save(function (err) {
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
