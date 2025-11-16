const mongoose = require('mongoose');

const mealSchema = new mongoose.Schema({
  name: {
    type: String, // e.g., "Breakfast", "Lunch", "Dinner"
    required: true,
  },
  items: {
    type: String, // e.g., "Poha, Jalebi, Tea/Coffee"
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const messSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  cuisine: {
    type: String, // e.g., "North Indian", "South Indian"
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
  isOfficial: {
    type: Boolean,
    default: false,
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
  },
  menu: [mealSchema],
  distance: {
    type: Number, // Distance from college in km
  },
  googleMapLink: {
    type: String,
  },
  ownerName: {
    type: String,
  },
  pricing: {
    monthly: {
      type: String, // e.g., "4000-6000"
    }
  },
  // New fields as per requirements
  totalSeats: {
    type: Number,
    default: 0 // Make it optional with default value
  },
  priceRange: {
    type: String,
  },
  mealsIncluded: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Mess', messSchema);