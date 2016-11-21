var mongoose = require('mongoose');

var FriendshipSchema = new mongoose.Schema({
  userA : {type: String, required: true},
  userB : {type: String, required: true},
  friendshipID: {type: String, unique: true},
  accepted: {type: Boolean, default: false},
  createdAt: {type: Date, default: Date.now}
});

FriendshipSchema.methods.toJSON = function() {
  var obj = this.toObject();
  return obj;
};

module.exports = mongoose.model("Friendship", FriendshipSchema);
