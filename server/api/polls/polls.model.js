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
  voters: [{ type: Schema.Types.ObjectId, ref: 'User'}],
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comments'
  }],
  created_date: {type: Date, default: Date.now},
  active: Boolean
});

PollsSchema.statics = {
  loadCommunity: function(cb) {
    this.find({})
      .populate({path:'author', select: 'name'})
      .sort('-created_date')
      .limit(50)
      .exec(cb);
  },
  loadPoll: function(id, cb) {
    this.find({_id: id})
      .populate({path:'author', select: 'name'})
      .exec(cb);
  },
  loadPollByUserQuestion: function(userId, question, cb) {
    this.find({author: userId, question: question})
      .populate({path:'author', select: 'name'})
      .exec(cb);
  }
};

module.exports = mongoose.model('Polls', PollsSchema);
