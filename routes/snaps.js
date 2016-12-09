var express = require('express');
var multer = require('multer');
var upload = multer({dest : 'uploads/'});
var router = express.Router();
var passHash = require('password-hash');
var mongoose = require('mongoose');
var fs = require('fs');
var User = require('../models/User.js')
var Snap = require('../models/Snap.js')

router.post('/postSnap', upload.single('snapPhoto'), function(req, res, next){
  var username = req.body.username;
  var recipient = req.body.recipient;
  var ycoordinate = req.body.ycoordinate;
  var caption = req.body.caption;
  var showLength = req.body.showLength;
  var data = fs.readFileSync(req.file.path);
  var contentType = 'image/jpeg';
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
    var response = {
      status : 'ok',
      message : 'Snap posted successfully',
      snap : snap
    }
    res.status(201).send(response);
  });
});

router.post('/getSnapsByUserId', upload.array(), function(req, res, next){
  var username = req.body.username;
  Snap.find({$or:[{'sender' : username}, {'recipient' : username}]}, function(err, docs) {
      if (!err) {
        var response = {
          status : 'ok',
          message : 'Snaps retrieved successfully',
          snaps : docs
        };
        res.status(200).send(response);
        return;
      } else {
        var response = {
          status : 'error',
          message : 'Error retrieving snaps, ' + err.msg;
        }
        res.status(200).send(response);
      }
  });
});

module.exports = router;
