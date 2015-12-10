// MODULES - EXPRESS
var express = require('express');
var path = require('path');

// MODULE - MONGODB
var Db = require('mongodb').Db;
var Server = require('mongodb').Server;

// MODULE - PASSPORTJS
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

// MODULE - MONGOOSE
var mongoose = require('mongoose/');

// CONFIGURATION - EXPRESS
var app = express();
app.listen(80);
app.use('/static', express.static(__dirname + '/public'));
app.use(passport.initialize());
app.use(passport.session());

// CONFIGURATION - MONGOOSE
mongoose.connect('mongodb://127.0.0.1/appDB');
var Schema = mongoose.Schema;
var UserDetail = new Schema({
      username: String,
      password: String
    }, {
      collection: 'userInfo'
    });
var UserDetails = mongoose.model('userInfo', UserDetail);

// CONFIGURATION - PASSPORT
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(new LocalStrategy(function(username, password, done) {
  process.nextTick(function() {
    UserDetails.findOne({
      'username': username,
    }, function(err, user) {
      if (err) {
        return done(err);
      }

      if (!user) {
        return done(null, false);
      }

      if (user.password != password) {
        return done(null, false);
      }

      return done(null, user);
    });
  });
}));

// EXPRESS - ROUTES
var html_dir = '/var/www/devbox/public/';
var html_dir_base = '/var/www/devbox/';

app.get('/', function(req, res) {
  res.sendFile('base/html/pages/maintenance.html', {
    root: __dirname
  });
});

app.get('/login', function(req, res) {
  res.sendFile('base/html/pages/login-v3.html', {
    root: __dirname
  });
});

// EXPRESS - ROUTES - PASSPORT
app.post('/login',
  passport.authenticate('local', {
    successRedirect: '/loginSuccess',
    failureRedirect: '/loginFailure'
  })
);

app.get('/loginFailure', function(req, res, next) {
  res.send('Failed to authenticate');
});

app.get('/loginSuccess', function(req, res, next) {
  res.send('Successfully authenticated');
});

// SERVER - START
module.exports = app;
