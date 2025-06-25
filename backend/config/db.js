const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Use a local MongoDB connection for development
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/expense-tracker';
    
    const conn = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Database connection failed:', error.message);
    // For demo purposes, we'll continue without database
    console.log('Continuing without database connection for demo...');
  }
};

module.exports = connectDB;