'use strict';

var express = require('express');
var controller = require('./media.controller');

var router = express.Router();

router.get('/:id', controller.index);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

module.exports = router;