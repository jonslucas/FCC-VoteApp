'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PollsSchema = new Schema({
  question: String,
  author: String,
  choices: [{choice:String,votes: Number}],
  comments: [{body:String, author:String, date: Date}],
  created_date: {type: Date, default: Date.now},
  active: Boolean
});

module.exports = mongoose.model('Polls', PollsSchema);
