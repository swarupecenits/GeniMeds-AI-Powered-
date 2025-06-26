const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true }, // Firebase UID
  name: { type: String },
  email: { type: String, required: true, unique: true },
  photoURL: { type: String }, // Profile picture URL from Google or custom upload
  loginMethod: { type: String, enum: ['email', 'google'], default: 'email' } // Track login method
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
