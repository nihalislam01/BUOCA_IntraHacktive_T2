const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    purpose: {type: String, required: true},
    bookedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    status: {type: String, enum: ['Pending', 'Approved', 'Denied'], default: 'Pending',},
    rooms: [{
        date: {type: String, required: true },
        schedule: {type: String, required: true},
        room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true}
    }],
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema);