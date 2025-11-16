const mongoose = require('mongoose');

const communityPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['General', 'Discussion', 'Help', 'LostAndFound'],
    default: 'General',
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  likes: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }
  }],
  comments: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    text: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  }],
  image: {
    type: String,
  },
  isLostItem: {
    type: Boolean,
    default: false,
  },
  isFoundItem: {
    type: Boolean,
    default: false,
  },
  itemStatus: {
    type: String,
    enum: ['Lost', 'Found', 'Returned'],
    default: 'Lost',
  },
  location: {
    type: String,
  },
  contactInfo: {
    email: String,
    phone: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('CommunityPost', communityPostSchema);