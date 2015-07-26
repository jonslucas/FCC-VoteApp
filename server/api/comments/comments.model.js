'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CommentsSchema = new Schema({
  body: String,
  poll: {type: Schema.Types.ObjectId, ref: 'Polls'},
  author:{type: Schema.Types.ObjectId, ref: 'User'},
  date: {type: Date, default: Date.now}
});

CommentsSchema.statics = {
  getComment: function(pollId, cb) {
    this.find({poll: pollId})
      .populate({path:'author', select: 'name'})
      .exec(cb);
  }
};

module.exports = mongoose.model('Comments', CommentsSchema);
