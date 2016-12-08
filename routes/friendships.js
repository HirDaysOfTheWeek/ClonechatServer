var express = require('express');
var multer = require('multer');
var upload = multer({dest : 'uploads/'});
var router = express.Router();
var mongoose = require('mongoose');
var fs = require('fs');
var Friendship = require('../models/Friendship.js')


//
router.post('/createFriendship', upload.array(), function(req, res, next){
    var userA = req.body.userA;
    var userB = req.body.userB;
    var friendshipID = req.body.friendshipID;

    var friendship = {
      userA : userA,
      userB : userB,
      friendshipID : friendshipID
    }

    Friendship.create(friendship, function(err, friendship){
      if (err) {
        return next(err);
      }
      res.status(201).json(friendship);
    });

});

router.post('/updateFriendship', upload.array(), function(req, res, next){
  var friendshipID = req.body.friendshipID;
  Friendship.findOne({'friendshipID' : friendshipID}, function(err, friendship){
    if(err) {
      return next(err);
    }
    friendship.accepted = true;
    friendship.save(function(err, updatedFriendship){
      if(err) {
        return next(err);
      }
      res.status(201).send(updatedFriendship);
    });
  });

});

module.exports = router;
