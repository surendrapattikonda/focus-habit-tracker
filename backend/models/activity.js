const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  activityName: {
    type: String,
    required: [true, 'Activity name is required'],
    trim: true,
    maxlength: 100
  },
  duration: {
    type: Number,
    required: [true, 'Duration is required'],
    min: [1, 'Duration must be at least 1 minute'],
    max: [1440, 'Duration cannot exceed 24 hours']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['Work', 'Study', 'Exercise', 'Break', 'Personal']
  },
  timestamp: {
    type: Date,
    required: true,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for faster queries
activitySchema.index({ userId: 1, timestamp: -1 });

module.exports = mongoose.model('Activity', activitySchema);