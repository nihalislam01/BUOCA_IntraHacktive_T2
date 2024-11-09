const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
    date: {type: Date, required: true},
    schedules: {type: String, default: "00000000", require: true},
    room: {type: mongoose.Schema.Types.ObjectId,ref: 'Room', require: true}
});

module.exports = mongoose.model('Schedule', scheduleSchema);