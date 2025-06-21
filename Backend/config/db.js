const mongoose = require('mongoose');
const dotenv=require('dotenv')
const colors=require('colors')

dotenv.config();
const connectDb = async () => {
    try {
      const conn = await mongoose.connect(process.env.MONGODB_URI);
      console.log(`MongoDB Connected`);
    } catch (error) {
      console.error(error.message);
      process.exit(1);
    }
  }

  module.exports = connectDb;

