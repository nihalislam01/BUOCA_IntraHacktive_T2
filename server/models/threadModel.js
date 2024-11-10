const mongoose = require('mongoose');

const threadSchema = new mongoose.Schema({
    type: { type: String, enum: ['Event', 'Budget', 'Booking'], required: true },
    referenceId: { type: mongoose.Schema.Types.ObjectId, required: true, unique: true },
}, { timestamps: true });

module.exports = mongoose.model('Thread', threadSchema);