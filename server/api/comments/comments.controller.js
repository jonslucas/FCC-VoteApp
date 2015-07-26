'use strict';

var _ = require('lodash');
var Comments = require('./comments.model');

// Get list of comments for a poll
exports.getPollComs = function (req, res) {
  Comments.getComment(req.params.id, function (err, comments) {
    if(err) { return handleError(res, err); }
    return res.json(200, comments);
  })
};


// Get list of comments
exports.index = function(req, res) {
  Comments.find(function (err, comments) {
    if(err) { return handleError(res, err); }
    return res.json(200, comments);
  });
};

// Get a single comments
exports.show = function(req, res) {
  Comments.findById(req.params.id, function (err, comments) {
    if(err) { return handleError(res, err); }
    if(!comments) { return res.send(404); }
    return res.json(comments);
  });
};

// Creates a new comments in the DB.
exports.create = function(req, res) {
  Comments.create(req.body, function(err, comments) {
    if(err) { return handleError(res, err); }
    return res.json(201, comments);
  });
};

// Updates an existing comments in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Comments.findById(req.params.id, function (err, comments) {
    if (err) { return handleError(res, err); }
    if(!comments) { return res.send(404); }
    var updated = _.merge(comments, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, comments);
    });
  });
};

// Deletes a comments from the DB.
exports.destroy = function(req, res) {
  Comments.findById(req.params.id, function (err, comments) {
    if(err) { return handleError(res, err); }
    if(!comments) { return res.send(404); }
    comments.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
