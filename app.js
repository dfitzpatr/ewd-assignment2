'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';


var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var config = require('./config/');
var path = require('path');

//create an express app
var app = express();

// Connect to database
mongoose.connect(config.mongo.uri, config.mongo.options);

//configure the express app to parse JSON-formatted body
app.use(bodyParser.json());

// Configure the app to serve up content from public directory
app.use(express.static(path.join(config.root, 'public')));


require('./routes')(app);

// Listen on port 8000, IP defaults to 127.0.0.1
app.listen(config.port)

// Put a friendly message on the terminal
console.log('Express app listening on %d', config.port);