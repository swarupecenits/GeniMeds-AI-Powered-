const express = require('express');
const router = express.Router();
const { upload, chatWithFiles, simpleChat, getResponse } = require('../controllers/aichatprescriptionController');

// Route to upload files and chat with AI (supports images, PDFs, text files)
router.post('/upload-analyze', upload, chatWithFiles);

// Route for simple chat without file upload
router.post('/chat', simpleChat);

// Legacy route for backward compatibility
router.post('/simple', getResponse);

module.exports = router;
