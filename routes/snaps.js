var express = require('express');
var router = express.Router();
var passHash = require('password-hash');
var mongoose = require('mongoose');
var fs = require(‘fs’);
var User = require('../models/User.js')
var Snap = require('../modles/Snap.js')

router.post('/postSnap', function(req, res, next){
  var username = req.body.username;
  var recipient = req.body.recipient;
  var ycoordinate = req.body.ycoordinate;
  var caption = req.body.caption;
  var showLength = req.body.showLength;
  var data = fs.readFileSync(req.files.snapPhoto.path);
  var contentType = 'image/jpg';
  var img = {data : data, contentType : contentType};
  var snap = {
    picture : img,
    recipient : recipient,
    sender : username,
    ycoordinate : ycoordinate,
    caption : caption,
    showLength : showLength
  };
  Snap.create(snap, function(err, snap){
    if (err) {
      return next(err);
    }
    res.status(201).json(snap);
  });
});
