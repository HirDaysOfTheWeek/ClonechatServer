var PORT = 3000;

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();

var users = require('./routes/users');
var snaps = require('./routes/snaps')

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
app.use('/snaps', snaps);

module.exports = app;
