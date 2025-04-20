const mongoose = require('mongoose');
require('dotenv').config();

//connects to MongoDB
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;
    
    //if no valid MongoDB URI is provided, log warning but don't crash
    if (!mongoURI || !mongoURI.startsWith('mongodb')) {
      console.log('Warning: Valid MongoDB URI not found. Running in mock DB mode.');
      console.log('Set MONGODB_URI in .env file for real database connection.');
      return; //returns without crashing
    }
    
    await mongoose.connect(mongoURI);
    console.log('MongoDB Connected...');
  } catch (err) {
    console.log('MongoDB connection error:', err.message);
    //don't exit process so app can run in mock mode
  }
};

module.exports = connectDB; 