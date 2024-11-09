const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    name: {type: String,required: true, unique: true, trim: true},
    floor: {type: String, required: true, trim: true},
    capacity: {type: Number,required: true},
}, { timestamps: true });

module.exports = mongoose.model('Room', roomSchema);
