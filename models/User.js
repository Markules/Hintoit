const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  userToken: String,
  email: {
    type: String,
    required: true,
    index: { unique: true },
    lowercase: true,
    trim: true,
  },
  firstName: { type: String, required: true },
  lastName: { type: String, required: false },
  profileImage: [{
    type: Schema.Types.ObjectId,
    required: false,
    ref: "Image",
  }],
  _gifts: [{ type: Schema.Types.ObjectId, required: false, ref: "gifts" }],
  following: [{ type: Schema.Types.ObjectId, required: false, ref: "users" }],
  followers: [{ type: Schema.Types.ObjectId, required: false, ref: "users" }],
  likes: [{ type: Schema.Types.ObjectId, required: false, ref: "Like" }],
  CreatedAt: {type: Date, default: Date.now},
  avatar: {type: String}
});

const User = mongoose.model("users", userSchema);

module.exports = User;
