// MODULES
var express = require('express');
var http = require('http');
var path = require('path');

// MODULE - MONGODB
var Db = require('mongodb').Db;
var Server = require('mongodb').Server;

// EXPRESS - CONFIGURATION
var app = express();
app.listen(80);
app.use(express.static( path.join(__dirname, 'public')));

// EXPRESS - ROUTES
app.get('/', function(req, res) {
res.send('Hello World');
});

app.get('/test', function(req, res) {
  res.sendFile('index.html');
});

// SERVER - START
module.exports = app;
