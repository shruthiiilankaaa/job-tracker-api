const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Applied', 'OA', 'Interview', 'Rejected', 'Offer'],
    default: 'Applied',
  },
  appliedDate: {
    type: Date,
    default: Date.now,
  },
  notes: {
    type: String,
    default: '',
  },
}, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema);