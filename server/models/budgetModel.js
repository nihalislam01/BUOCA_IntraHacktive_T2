const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema({
  club: {type: String, required: true},
  amountRequested: {type: String, required: true},
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Denied'],
    default: 'Pending',
  },
  purpose: {type: String, required: true},
  requestedBy: {type: mongoose.Schema.Types.ObjectId,ref: 'User',required: true},
  approvedBy: {type: mongoose.Schema.Types.ObjectId,ref: 'User'},
}, { timestamps: true });

module.exports = mongoose.model('Budget', budgetSchema);
