const express = require('express');
const router = express.Router();
const { analyzeSymptoms, getCommonSymptoms } = require('../controllers/symptomCheckerController');

// POST /api/symptom-checker/analyze
router.post('/analyze', analyzeSymptoms);

// GET /api/symptom-checker/symptoms
router.get('/symptoms', getCommonSymptoms);

module.exports = router;
