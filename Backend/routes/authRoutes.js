const express = require('express');
const router = express.Router();
const { syncFirebaseUser } = require('../controllers/authController');
const { auth } = require('../middleware/authMiddleware');

router.post('/sync', auth, syncFirebaseUser);

module.exports = router;
