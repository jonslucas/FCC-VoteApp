'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PollsSchema = new Schema({
  question: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  choices: [{choice:String,votes: Number, voters: [String]}],
  comments: [{
    body:String,
    author:{type: Schema.Types.ObjectId, ref: 'User'},
    date: Date}],
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
  }
};

module.exports = mongoose.model('Polls', PollsSchema);
