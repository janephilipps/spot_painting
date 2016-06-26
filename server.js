// Require modules
var express = require("express");
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
var env = process.env;
var favicon = require('serve-favicon');
var passport = require('passport');

if (env.MONGOLAB_URI) {
  console.log("Connecting to prod mongo.");
  mongoose.connect(env.MONGOLAB_URI);
} else {
  console.log("Connecting to dev mongo");
  mongoose.connect('mongodb://localhost:27017/spot_painting_db');
}

var routes = require('./routes/index');

var app = express();

var port = process.env.PORT || 3000;

// MIDDLEWARE

app.use(bodyParser.json());

// Parse appication/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json'}));

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(methodOverride('X-HTTP-Method-Override'));

app.use(express.static(__dirname + '/public'));

app.use(favicon(__dirname + '/public/images/favicon.ico'));

app.use(passport.initialize());

require('./routes')(app);

app.listen(port);

console.log('Spots beginning to appear on port ' + port);

exports = module.exports = app;
