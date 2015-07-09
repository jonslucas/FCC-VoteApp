'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PollsSchema = new Schema({
  question: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  choices: [{choice:String,votes: Number}],
  comments: [{
    body:String,
    author:{type: Schema.Types.ObjectId, ref: 'User'},
    date: Date}],
  created_date: {type: Date, default: Date.now},
  active: Boolean
});

module.exports = mongoose.model('Polls', PollsSchema);
