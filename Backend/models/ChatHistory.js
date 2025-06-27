const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  type: { type: String, enum: ['user', 'ai', 'system'], required: true },
  content: { type: String, required: true },
  timestamp: { type: String, required: true },
  files: [{
    name: String,
    size: Number,
    type: String,
    url: String
  }]
});

const chatHistorySchema = new mongoose.Schema({
  userId: { type: String, required: true }, // Firebase UID
  sessionId: { type: String, required: true }, // Unique session identifier
  title: { type: String, default: 'New Chat' }, // Chat title for display
  analysisMode: { type: String, enum: ['prescription', 'lab-reports'], default: 'prescription' },
  messages: [messageSchema],
  isActive: { type: Boolean, default: true },
  lastActivity: { type: Date, default: Date.now }
}, { timestamps: true });

// Index for faster queries
chatHistorySchema.index({ userId: 1, lastActivity: -1 });
chatHistorySchema.index({ userId: 1, sessionId: 1 });

module.exports = mongoose.model('ChatHistory', chatHistorySchema);
