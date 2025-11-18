const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    mongoose.set('strictQuery', false);
    
    const conn = await mongoose.connect(
      process.env.MONGODB_URI || 'mongodb+srv://rjdhav67_db_user:zZCK838qK1vqaGDB@roomeze.cmvpkvz.mongodb.net/roomeze?retryWrites=true&w=majority',
      {
        maxPoolSize: 10,
        minPoolSize: 2,
        serverSelectionTimeoutMS: 10000,
        socketTimeoutMS: 45000,
        family: 4,
      }
    );

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    console.log(`Database: ${conn.connection.name}`);
    
    return conn;
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    console.error('Stack:', error.stack);
    process.exit(1);
  }
};

module.exports = connectDB;