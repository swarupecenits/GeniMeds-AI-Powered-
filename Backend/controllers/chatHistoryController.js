const ChatHistory = require('../models/ChatHistory');
const admin = require('../config/firebaseAdmin');

// Get all chat sessions for a user
exports.getUserChatSessions = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    const decoded = await admin.auth().verifyIdToken(token);
    
    const chatSessions = await ChatHistory.find({ 
      userId: decoded.uid,
      isActive: true 
    })
    .select('sessionId title analysisMode lastActivity createdAt')
    .sort({ lastActivity: -1 })
    .limit(50); // Limit to last 50 sessions

    res.status(200).json({ chatSessions });
  } catch (err) {
    console.error('Get chat sessions error:', err);
    res.status(500).json({ message: 'Failed to get chat sessions', error: err.message });
  }
};

// Get specific chat session with messages
exports.getChatSession = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    const decoded = await admin.auth().verifyIdToken(token);
    const { sessionId } = req.params;

    const chatSession = await ChatHistory.findOne({ 
      userId: decoded.uid,
      sessionId: sessionId,
      isActive: true 
    });

    if (!chatSession) {
      return res.status(404).json({ message: 'Chat session not found' });
    }

    res.status(200).json({ chatSession });
  } catch (err) {
    console.error('Get chat session error:', err);
    res.status(500).json({ message: 'Failed to get chat session', error: err.message });
  }
};

// Save or update chat session
exports.saveChatSession = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    const decoded = await admin.auth().verifyIdToken(token);
    const { sessionId, title, analysisMode, messages } = req.body;

    // Generate title from first user message if not provided
    let chatTitle = title;
    if (!chatTitle && messages && messages.length > 0) {
      const firstUserMessage = messages.find(msg => msg.type === 'user');
      if (firstUserMessage) {
        chatTitle = firstUserMessage.content.substring(0, 50) + (firstUserMessage.content.length > 50 ? '...' : '');
      }
    }

    const chatSession = await ChatHistory.findOneAndUpdate(
      { userId: decoded.uid, sessionId: sessionId },
      { 
        userId: decoded.uid,
        sessionId: sessionId,
        title: chatTitle || 'New Chat',
        analysisMode: analysisMode || 'prescription',
        messages: messages || [],
        lastActivity: new Date()
      },
      { 
        new: true, 
        upsert: true,
        setDefaultsOnInsert: true
      }
    );

    res.status(200).json({ 
      message: 'Chat session saved successfully', 
      chatSession: {
        sessionId: chatSession.sessionId,
        title: chatSession.title,
        analysisMode: chatSession.analysisMode,
        lastActivity: chatSession.lastActivity
      }
    });
  } catch (err) {
    console.error('Save chat session error:', err);
    res.status(500).json({ message: 'Failed to save chat session', error: err.message });
  }
};

// Delete chat session
exports.deleteChatSession = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    const decoded = await admin.auth().verifyIdToken(token);
    const { sessionId } = req.params;

    const result = await ChatHistory.findOneAndUpdate(
      { userId: decoded.uid, sessionId: sessionId },
      { isActive: false },
      { new: true }
    );

    if (!result) {
      return res.status(404).json({ message: 'Chat session not found' });
    }

    res.status(200).json({ message: 'Chat session deleted successfully' });
  } catch (err) {
    console.error('Delete chat session error:', err);
    res.status(500).json({ message: 'Failed to delete chat session', error: err.message });
  }
};

// Update chat session title
exports.updateChatTitle = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    const decoded = await admin.auth().verifyIdToken(token);
    const { sessionId } = req.params;
    const { title } = req.body;

    const chatSession = await ChatHistory.findOneAndUpdate(
      { userId: decoded.uid, sessionId: sessionId },
      { title: title, lastActivity: new Date() },
      { new: true }
    );

    if (!chatSession) {
      return res.status(404).json({ message: 'Chat session not found' });
    }

    res.status(200).json({ message: 'Chat title updated successfully', title: chatSession.title });
  } catch (err) {
    console.error('Update chat title error:', err);
    res.status(500).json({ message: 'Failed to update chat title', error: err.message });
  }
};
