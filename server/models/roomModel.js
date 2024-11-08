
const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    capacity: {
        type: Number,
        required: true
    
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
    bookedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    bookingDate: {
        type: Date,
        default: null
    }
}, { timestamps: true });

module.exports = mongoose.model('Room', roomSchema);
