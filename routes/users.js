var express = require('express');
var multer = require('multer');
var upload = multer({dest : 'uploads/'});
var router = express.Router();
var passHash = require('password-hash');
var mongoose = require('mongoose');
var User = require('../models/User.js')

router.post('/register', upload.array(), function(req,res,next){
  var e = req.body.email;
  var u = req.body.username;
  var p = req.body.password;

  var u = {
    email : e,
    username : u,
    password : passHash.generate(p)
  };

  User.create(u, function(err, usr){
    if(err){
      return next(err);
    }
    var response = {
      status : 'ok',
      message : 'Registration Successful',
      user : usr
    };
    res.status(201).send(response);
  });

});

router.post('/login', upload.array(), function(req,res,next){
  var u = req.body.username;
  var p = req.body.password;

  User.findOne({'username' : u}, '_id username password', function(err,user){
    if(err){
      return next(err);
    }
    if(user === null){
      var response = {
        status : 'error',
        message : 'Username or password is invalid'
      };

      res.status(200).send(response);
      return;

    }
    var hash = user.password;
    var success = passHash.verify(p, hash);
    var response = {
      status : success ? 'ok' : 'error',
      message : success ? 'login success' :'Username or password is invalid'
    }

    if (success) {
      response.user = user;
    }

    res.status(200).send(response);

  });

});

router.post('/getUser', upload.array(), function(req, res, next){
  var userId = req.body.username;
  User.findOne({'username' : userId}, '_id username', function(err, user){
    if(user === null){
      var response = {
        status : 'error',
        message : 'Username is invalid'
      };
      res.status(200).send(response);
    } else {
      var response = {
        status : 'ok',
        message : 'User found',
        username : user.username
      };
      res.status(200).send(response);
    }
  });
});

module.exports = router;
