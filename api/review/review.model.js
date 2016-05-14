'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var reviewSchema = new Schema({
  userReview: String,
  title: String,
  author: String,
  ISBN: String,
  upvotes: Number,
  userId: String,
  updated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('review', reviewSchema);

