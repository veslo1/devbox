// MODULE DEPENDANCIES
var express = require('express'),
  routes = require('./routes'),
  http = require('http');

// TEMPLATE ENGINE
var hbs = require('hbs');

// MONGODB
var Db = require('mongodb').Db;
var Server = require('mongodb').Server;

// EXPRESS VARIABLES
var app = express();
app.configure(function() {
  app.set('port', process.env.PORT || 80);
  app.use(express.favicon());
  app.use(express.loger('dev'));
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
  app.engine('html', require('hbs').__express);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'html');
});

app.configure('development', function() {
  app.use(express.errorHandler());
});

// ROUTING
app.get('/', function(req, res) {
  res.render('index.html', {
    layout: flase,
    'title': 'Devbox'
  });
})

// SERVER SETUP
http.createServer(app).listen(app.get('port'), function() {
  console.log("Express server listening on port " + app.get('port'));
});
