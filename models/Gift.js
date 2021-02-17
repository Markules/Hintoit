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
  numberOfLikes: { type: Number, default: 0 },
  _user: { type: Schema.Types.ObjectId, ref: "users" },
  dateCreated: Date,
});

const Gift = mongoose.model("gifts", giftSchema);

module.exports = Gift;
