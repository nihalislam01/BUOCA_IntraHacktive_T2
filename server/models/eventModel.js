const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({ 
  name: { type: String, required: true },
  eventDate: { type: Date, required: true },
  description: { type: String, required: true },
  status: {type: String,menum: ['Requested', 'Approved', 'Rejected'], default: 'Requested'},
  requestedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  aprrovedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  club: { type: mongoose.Schema.Types.ObjectId, ref: 'Club' }
}, { timestamps: true } );

module.exports = mongoose.model('Event', eventSchema);