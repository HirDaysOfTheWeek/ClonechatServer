var PORT = 3000;

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();

app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

var users = require('./routes/users');

var http = require('http').Server(app);

mongoose.connect('mongodb://localhost/ccs', function(err){
  if (err){
    console.log('unable to connect to MongoDB', err);
    return;
  }
  console.log('Successfully connected to MongoDB');
});

http.listen(PORT, function(){
  console.log('listening on PORT 3000');
});

app.use('/users', users);

module.exports = app;