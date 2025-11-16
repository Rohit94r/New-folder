const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['PG', 'Hostel', 'Flat'],
    required: true,
  },
  description: {
    type: String,
  },
  address: {
    type: String,
    required: true,
  },
  distanceFromCollege: {
    type: Number, // in kilometers
    required: true,
  },
  roomSize: {
    type: String, // e.g., "110 sq ft"
  },
  rent: {
    type: Number,
    required: true,
  },
  deposit: {
    type: Number,
  },
  sharingType: {
    type: String, // e.g., "Single Occupancy", "Double Sharing"
  },
  amenities: [{
    type: String,
  }],
  availability: {
    type: String,
    enum: ['Available', 'Almost Full', 'Full'],
    default: 'Available',
  },
  occupancy: {
    type: Number,
    default: 0,
  },
  totalSeats: {
    type: Number,
    required: true,
  },
  images: [{
    type: String,
  }],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  phone: {
    type: String,
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

module.exports = mongoose.model('Property', propertySchema);