var mongoose = require('mongoose');

var FriendshipSchema = new mongoose.Schema({
  userA : {String : User, required: true, unique: true},
  userB : {String: User, required: true, unique: true},
  accepted: {Boolean, default: false},
  createdAt: {type: Date, default: Date.now}
});

FriendshipSchema.methods.toJSON = function() {
  var obj = this.toObject();
  return obj;
};

module.exports = mongoose.model("Friendship", FriendshipSchema);
