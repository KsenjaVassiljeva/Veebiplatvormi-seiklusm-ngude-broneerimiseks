const express = require('express');
const router = express.Router();
const timeSlotController = require('../controllers/timeSlotController');

// Get all available slots for a quest
router.get('/quest/:questId', timeSlotController.getSlotsByQuest);

// Get available slots for specific date range
router.get('/quest/:questId/available', timeSlotController.getAvailableSlots);

// Create time slot (admin only)
router.post('/', timeSlotController.createTimeSlot);

module.exports = router;
