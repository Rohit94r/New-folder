const mongoose = require('mongoose');

// Cache the database connection to reuse across serverless function calls
let cachedConnection = null;

const connectDB = async () => {
  // If we have a cached connection, return it
  if (cachedConnection && mongoose.connection.readyState === 1) {
    console.log('Using cached MongoDB connection');
    return cachedConnection;
  }

  try {
    // Set mongoose options for better serverless performance
    mongoose.set('strictQuery', false);
    
    const conn = await mongoose.connect(
      process.env.MONGODB_URI || 'mongodb+srv://rjdhav67:sSsDvMd4XhDpOv6S@roomeze.cmvpkvz.mongodb.net/roomeze',
      {
        maxPoolSize: 10, // Maximum number of connections in the pool
        minPoolSize: 2,  // Minimum number of connections in the pool
        serverSelectionTimeoutMS: 10000, // Timeout for server selection
        socketTimeoutMS: 45000, // Timeout for socket operations
        family: 4, // Use IPv4, skip trying IPv6
      }
    );

    cachedConnection = conn;
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    console.log(`Database: ${conn.connection.name}`);
    
    return conn;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    console.log('Failed to connect to MongoDB. Please check your connection string and network.');
    
    // In serverless, don't exit the process, just throw the error
    if (process.env.VERCEL) {
      throw error;
    }
    
    process.exit(1);
  }
};

module.exports = connectDB;