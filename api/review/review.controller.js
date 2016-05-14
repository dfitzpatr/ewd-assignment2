'use strict';

var _ = require('lodash');
var review = require('./review.model');

// Get list of users review
exports.index = function(req, res) {

    var query = review.find().where('ISBN').in(req.params.id)

    query.exec( function (err, users) {
      if(err) { return handleError(res, err); }
        return res.json(200, users);
    });

} ;

// Creates a new review in datastore.
exports.create = function(req, res) {
  review.create(req.body, function(err, review) {
    if(err) { return handleError(res, err); }
    return res.json(201, review);
  });
};

// Updates an existing review in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  review.findById(req.params.id, function (err, review) {
    if (err) { return handleError(res, err); }
    if(!review) { return res.send(404); }
    var updated = _.merge(review, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, review);
    });
  });
};

// delete an existing review in datastore.
exports.delete = function(req, res) {
    review.findById(req.params.id, function (err, review) {
    if(err) { return handleError(res, err); }
    if(!review) { return res.send(404); }
    review.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
};