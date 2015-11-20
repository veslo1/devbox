// MODULES - EXPRESS
var express = require('express'),
http = require('http');

var app = express();

// MODULE - MONGODB
var Db = require('mongodb').Db;
var Server = require('mongodb').Server;

// EXPRESS - CONFIGURATION
app.configure(function() {
  app.set('port', process.env.PORT || 80);
});

// EXPRESS - ROUTES
app.get('/', function(req, res) {
res.send('Hello World');
});

http.createServer(app).listen(app.get('port'), function() {
  console.log("Express server listening on port " + app.get('port'));
});

// app.listen(process.env.PORT || 80);
