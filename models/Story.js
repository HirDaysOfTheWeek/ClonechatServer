var mongoose = require("mongoose");

var StorySchema = new mongoose.Schema({
  picture : { data : Buffer, contentType : String},
  postedDate : {type : Date, default : Date.now},
  poster  : String,
  ycoordinate : Number,
  caption : String,
  showLength : Number,
  viewers : [String]
});

SnapSchema.methods.toJSON = function() {
  var obj = this.toObject();
  return obj;
};

module.exports = mongoose.model("Story", StorySchema);
