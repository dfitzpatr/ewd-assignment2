'use strict';

var _ = require('lodash');
var user = require('./user.model');

// Get list of users
exports.index = function(req, res) {
          // Connect to the db
   user.find(function (err, users) {
    if(err) { return handleError(res, err); }
    return res.json(200, users);
  });

} ;

// Get list of users
exports.findusername = function(req, res) {
    var username = req.params.username;
   user.findOne( {'username': username}, function (err, users) {
    if(err) { return handleError(res, err); }
    return res.json(200, users);
  });

} ;

// Creates a new user in datastore.
exports.create = function(req, res) {
  user.create(req.body, function(err, user) {
    if(err) { return handleError(res, err); }
    return res.json(201, user);
  });
};

// Updates an existing user in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  user.findById(req.params.id, function (err, user) {
    if (err) { return handleError(res, err); }
    if(!user) { return res.send(404); }
    var updated = _.merge(user, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, user);
    });
  });
};

// delete an existing user in datastore.
exports.delete = function(req, res) {
    user.findById(req.params.id, function (err, user) {
    if(err) { return handleError(res, err); }
    if(!user) { return res.send(404); }
    user.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
};