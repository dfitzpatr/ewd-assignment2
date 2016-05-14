'use strict';

var _ = require('lodash');
var media = require('./media.model');

// Get list of users media
exports.index = function(req, res) {

    var query = media.find().where('userId').in(req.params.id)

    query.exec( function (err, media) {
      if(err) { return handleError(res, err); }
        return res.json(200, media);
    });

} ;

// Creates a new media in datastore.
exports.create = function(req, res) {
  media.create(req.body, function(err, media) {
    if(err) { return handleError(res, err); }
    return res.json(201, media);
  });
};

// Updates an existing media in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  media.findById(req.params.id, function (err, media) {
    if (err) { return handleError(res, err); }
    if(!media) { return res.send(404); }
    var updated = _.merge(media, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, media);
    });
  });
};

// delete an existing media in datastore.
exports.delete = function(req, res) {
    media.findById(req.params.id, function (err, media) {
    if(err) { return handleError(res, err); }
    if(!media) { return res.send(404); }
    media.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
};