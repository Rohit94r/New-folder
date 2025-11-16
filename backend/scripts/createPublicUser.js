const mongoose = require('mongoose');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Load environment variables
require('dotenv').config();

// Connect to database
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/roomeze', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const createPublicUser = async () => {
  try {
    // Check if public user already exists
    const existingUser = await User.findOne({ email: 'public@roomeze.com' });
    
    if (existingUser) {
      console.log('Public user already exists');
      process.exit(0);
    }
    
    // Create public user
    const publicUser = new User({
      name: 'Public Service Submitter',
      email: 'public@roomeze.com',
      phone: '+91 0000000000',
      password: 'public123', // This will be hashed
      role: 'owner',
      isVerified: true,
    });
    
    await publicUser.save();
    console.log('Public user created successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error creating public user:', error);
    process.exit(1);
  }
};

createPublicUser();