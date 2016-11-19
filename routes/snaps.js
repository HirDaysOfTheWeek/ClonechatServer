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
    res.status(201).json(snap);
  });
});

module.exports = router;
