const mongoose = require("mongoose");
const { Schema } = mongoose;

const notificationSchema = new Schema({
    message: { type: String, required: true },
    date: { type: Date, default: Date.now },
    read: { type: Boolean, default: false },
    recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }

  });

const Notification = mongoose.model('Notification', notificationSchema);
module.exports = Notification;