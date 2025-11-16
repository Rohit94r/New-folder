const mongoose = require('mongoose');

const printingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  timings: {
    type: String, // e.g., "8:00 AM - 9:00 PM"
  },
  pricing: {
    blackAndWhite: {
      type: Number, // Price per page
    },
    color: {
      type: Number, // Price per page
    },
    binding: {
      type: Number, // Price per document
    },
    lamination: {
      type: Number, // Price per document
    },
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
  },
  reviews: {
    type: Number,
    default: 0,
  },
  image: {
    type: String,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  distance: {
    type: Number, // Distance from college in km
  },
  googleMapLink: {
    type: String,
  },
  ownerName: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Printing', printingSchema);