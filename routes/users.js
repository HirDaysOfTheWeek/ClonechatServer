var express = require('express');
var router = express.Router();
var passHash = require('password-hash');
var mongoose = require('mongoose');
var User = require('../models/User.js')

router.post('/register', function(req,res,next){
  var e = req.body.email;
  var u = req.body.username;
  var p = req.body.password;

  var user = {
    email : e,
    username : u,
    password : passHash.generate(p)
  };

  User.create(user, function(err, user){
    if(err){
      return next(err);
    }
    res.status(201).json(user);
  });

});

router.post('/login', function(req,res,next){
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

module.exports = router;
