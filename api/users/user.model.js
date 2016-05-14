'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var userSchema = new Schema({
  firstName: String,
  lastName: String,
  username: String,
  password: String,
  updated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('user', userSchema);