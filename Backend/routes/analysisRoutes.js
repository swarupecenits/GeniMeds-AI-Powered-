const express = require('express');
const router = express.Router();
const { analyzeText, analyzeFile, upload } = require('../controllers/analysisController');


router.post('/text', analyzeText);
router.post('/file', upload.single('document'), analyzeFile); //TODO: currently not working , will continue working on this tomorrow

module.exports = router; 