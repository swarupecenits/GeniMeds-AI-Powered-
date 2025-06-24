// server.js
require('dotenv').config(); // ✅ Load env variables FIRST
const app = require('./app');
const mongoose = require('mongoose');

// Skip MongoDB connection for development
const SKIP_MONGODB = process.env.NODE_ENV === 'development' || process.env.SKIP_MONGODB === 'true';

if (SKIP_MONGODB) {
  console.log('⚠️  Skipping MongoDB connection for development');
  app.listen(process.env.PORT || 5000, () => {
    console.log(`🚀 Server running on port ${process.env.PORT || 5000} (without MongoDB)`);
  });
} else {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => {
      console.log('✅ MongoDB connected');
      app.listen(process.env.PORT || 5000, () => {
        console.log(`🚀 Server running on port ${process.env.PORT || 5000}`);
      });
    })
    .catch(err => {
      console.error('❌ MongoDB connection error:', err);
      process.exit(1);
    });
}
