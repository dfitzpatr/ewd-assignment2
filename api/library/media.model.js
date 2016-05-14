'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var mediaSchema = new Schema({
  title: String,
  author: String,
  description: String,
  genre: String,
  type: String,
  upvotes: Number,
  imageURL: String,
  userId: String,
  ISBN: String,
  updated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('media', mediaSchema);