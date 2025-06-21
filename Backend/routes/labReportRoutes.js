const express = require('express');
const router = express.Router();
const { uploadLabReport } = require('../controllers/labReportController');
const { auth } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.post('/upload', auth, upload.single('file'), uploadLabReport);
module.exports = router;
