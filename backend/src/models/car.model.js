const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    tags: [String],
    image: [{ type: String }],  // URLs of images, up to 10
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

const Car = mongoose.model('Car', carSchema);
module.exports = { Car };
