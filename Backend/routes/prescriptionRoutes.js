const express = require('express');
const router = express.Router();
const { uploadPrescription, getUserPrescriptions } = require('../controllers/prescriptionController');
const { auth } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.post('/upload', auth, upload.single('file'), uploadPrescription);
router.get('/', auth, getUserPrescriptions);

module.exports = router;
