const express = require('express');
const router = express.Router();
const { setReminder } = require('../controllers/reminderController');

// POST /api/reminders/set - Set a medicine reminder
router.post('/set', setReminder);

module.exports = router;
