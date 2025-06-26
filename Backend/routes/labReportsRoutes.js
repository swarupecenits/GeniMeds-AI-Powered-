const express = require('express');
const router = express.Router();
const { upload, analyzeLabReports, simpleLabReportChat } = require('../controllers/aichatlabReportsController');

// Route to upload lab report files and analyze with AI (supports images, PDFs, text files)
router.post('/upload-analyze', upload, analyzeLabReports);

// Route for simple lab report chat without file upload
router.post('/chat', simpleLabReportChat);

module.exports = router;
