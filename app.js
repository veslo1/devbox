// MODULES
var express = require('express');
var path = require('path');

// MODULE - MONGODB
var Db = require('mongodb').Db;
var Server = require('mongodb').Server;

// EXPRESS - CONFIGURATION
var app = express();
app.listen(80);
app.use('/static', express.static(__dirname + '/public'));

// EXPRESS - ROUTES
var html_dir = '/var/www/devbox/public/';
var html_dir_base = '/var/www/devbox/';

app.get('/', function(req, res) {
res.send('Hello World');
});

app.get('/test', function(req, res) {
  res.sendFile(html_dir + 'index.html');
});

app.get('/login', function(req, res) {
  res.sendFile(html_dir_base + 'base/html/pages/login-v3.html');
});

// SERVER - START
module.exports = app;
