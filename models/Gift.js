const mongoose = require("mongoose");
const { Schema } = mongoose;

const giftSchema = new Schema({
  title: { type: String },
  url: { type: String, required: true },
  image: { type: String, required: false },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
    },
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
      text: {
        type: String,
        required: true,
      },
      firstName: {
        type: String,
      },
      lastName: {
        type: String,
      },
      avatar: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  catagories: [{ type: String }],
  _user: { type: Schema.Types.ObjectId, ref: "users" },
  dateCreated: Date,
});

const Gift = mongoose.model("gifts", giftSchema);

module.exports = Gift;
