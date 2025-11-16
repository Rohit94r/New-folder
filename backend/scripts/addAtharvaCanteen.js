const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Mess = require('../models/Mess');

// Load environment variables
dotenv.config();

// Connect to database
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/roomeze', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Atharva Canteen data
const atharvaCanteenData = {
  name: "Atharva Canteen",
  isOfficial: true,
  description: "The official canteen of Atharva College of Engineering",
  cuisine: "Multi-Cuisine",
  address: "Atharva Educational Complex, Malad Marve Road, Charkop, Malad West, Mumbai, Maharashtra 400095",
  phone: "+91 22 1234 5678",
  timings: "7:00 AM – 9:30 PM",
  rating: 4.5,
  reviews: 128,
  image: "/atharva-logo.png",
  menu: [
    { name: "Monday Breakfast", items: "Poha, Jalebi", price: 35 },
    { name: "Monday Lunch", items: "Rice, Dal", price: 70 },
    { name: "Monday Dinner", items: "Paneer Masala", price: 65 },
    { name: "Tuesday Breakfast", items: "Upma", price: 30 },
    { name: "Tuesday Lunch", items: "Sambar, Rice", price: 65 },
    { name: "Tuesday Dinner", items: "Pav Bhaji", price: 70 },
    { name: "Wednesday Breakfast", items: "Idli", price: 35 },
    { name: "Wednesday Lunch", items: "Dal, Chapati", price: 60 },
    { name: "Wednesday Dinner", items: "Pasta", price: 75 },
    { name: "Thursday Breakfast", items: "Paratha", price: 40 },
    { name: "Thursday Lunch", items: "Chana Dal", price: 65 },
    { name: "Thursday Dinner", items: "Pulao", price: 70 },
    { name: "Friday Breakfast", items: "Poori", price: 45 },
    { name: "Friday Lunch", items: "Paneer", price: 80 },
    { name: "Friday Dinner", items: "Biryani", price: 85 },
    { name: "Saturday Breakfast", items: "Dosa", price: 40 },
    { name: "Saturday Lunch", items: "Rajma", price: 70 },
    { name: "Saturday Dinner", items: "Noodles", price: 65 },
    { name: "Sunday Breakfast", items: "Eggs", price: 50 },
    { name: "Sunday Lunch", items: "Keema", price: 90 },
    { name: "Sunday Dinner", items: "Pizza", price: 100 }
  ],
  distance: 0,
  googleMapLink: "https://maps.google.com/?q=Atharva+College+of+Engineering",
  ownerName: "Atharva College Administration",
  pricing: {
    monthly: "Included in College Fees"
  }
};

const addAtharvaCanteen = async () => {
  try {
    await connectDB();
    
    // Check if Atharva Canteen already exists
    const existing = await Mess.findOne({ name: "Atharva Canteen", isOfficial: true });
    if (existing) {
      console.log("Atharva Canteen already exists in the database");
      process.exit(0);
    }
    
    // Create Atharva Canteen
    const canteen = new Mess(atharvaCanteenData);
    await canteen.save();
    
    console.log("Atharva Canteen added successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error adding Atharva Canteen:", error);
    process.exit(1);
  }
};

addAtharvaCanteen();