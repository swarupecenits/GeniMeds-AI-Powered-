const express = require('express');
const router = express.Router();
const { 
  getUserChatSessions, 
  getChatSession, 
  saveChatSession, 
  deleteChatSession, 
  updateChatTitle 
} = require('../controllers/chatHistoryController');
const { auth } = require('../middleware/authMiddleware');

// Get all chat sessions for user
router.get('/sessions', auth, getUserChatSessions);

// Get specific chat session
router.get('/sessions/:sessionId', auth, getChatSession);

// Save or update chat session
router.post('/sessions', auth, saveChatSession);

// Update chat title
router.put('/sessions/:sessionId/title', auth, updateChatTitle);

// Delete chat session
router.delete('/sessions/:sessionId', auth, deleteChatSession);

module.exports = router;
