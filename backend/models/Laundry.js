const mongoose = require('mongoose');

const laundrySchema = new mongoose.Schema({
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
    washAndFold: {
      type: Number, // Price per cloth
    },
    ironing: {
      type: Number, // Price per cloth
    },
  },
  deliveryAvailable: {
    type: Boolean,
    default: false,
  },
  deliveryCharges: {
    type: Number,
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

module.exports = mongoose.model('Laundry', laundrySchema);