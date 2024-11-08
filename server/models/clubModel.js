const mongoose = require('mongoose');

const clubSchema = new mongoose.Schema({
  name: {type: String, required: true, unique: true,trim: true},
  description: {type: String, required: true, trim: true},
  category: {
    type: String,
    enum: ['Sports', 'Academic', 'Cultural', 'Technology', 'Social', 'Other'],
    required: true,
  },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  contactEmail: {type: String, required: true, trim: true},
  contactPhone: {type: String, trim: true}
}, { timestamps: true });

const Club = mongoose.model('Club', clubSchema);

module.exports = Club;
