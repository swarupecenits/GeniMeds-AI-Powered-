const express = require('express');
const router = express.Router();
const { syncFirebaseUser, getUserProfile, updateUserProfile } = require('../controllers/authController');
const { auth } = require('../middleware/authMiddleware');

router.post('/sync', auth, syncFirebaseUser);
router.get('/profile', auth, getUserProfile);
router.put('/profile', auth, updateUserProfile);

module.exports = router;
