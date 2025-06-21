const express = require('express');
const router = express.Router();
const { extractMedicines } = require('../controllers/medicineController');
const { auth } = require('../middleware/authMiddleware');

router.post('/extract', auth, extractMedicines);
module.exports = router;