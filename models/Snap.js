var mongoose = require("mongoose");

var SnapSchema = new mongoose.Schema({
  picture : { data : Buffer, contentType : String},
  sentDate : {type : Date, default : Date.now},
  opened : {type : Boolean, default : false},
  recipient : String,
  sender : String,
  ycoordinate : Number,
  caption : String,
  showLength : Number
});

SnapSchema.methods.toJSON = function() {
  var obj = this.toObject();
  return obj;
};

module.exports = mongoose.model("Snap", SnapSchema);
