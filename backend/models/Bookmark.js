const mongoose = require('mongoose');

/**
 * Bookmark Schema
 * Allows users to save posts for later reading
 */
const bookmarkSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: true
  }
}, { timestamps: true });

// Ensure unique bookmarks per user and post
bookmarkSchema.index({ user: 1, post: 1 }, { unique: true });
bookmarkSchema.index({ user: 1, createdAt: -1 });

module.exports = mongoose.model('Bookmark', bookmarkSchema);
