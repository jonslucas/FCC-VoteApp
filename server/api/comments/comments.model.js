'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CommentsSchema = new Schema({
  body:String,
  poll: {type: Schema.Types.ObjectId, ref: 'Polls'},
  author:{type: Schema.Types.ObjectId, ref: 'User'},
  date: Date
});

module.exports = mongoose.model('Comments', CommentsSchema);
