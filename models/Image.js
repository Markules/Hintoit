const mongoose = require('mongoose');
const { Schema } = mongoose;

const imageSchema = new Schema({
    _id: Schema.Types.ObjectId,
    name: { type: String, required: true, trim: true },
    image: [{ type: String, required: true,  }],
    _user: { type: Schema.Types.ObjectId, ref: 'users' }
});

module.exports = mongoose.model('Image', imageSchema);