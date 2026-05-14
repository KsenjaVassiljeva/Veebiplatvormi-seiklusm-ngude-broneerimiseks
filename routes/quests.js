const express = require('express');
const router = express.Router();
const questController = require('../controllers/questController');

// Get all quests
router.get('/', questController.getAllQuests);

// Get quest by ID
router.get('/:id', questController.getQuestById);

// Create quest (admin only in production)
router.post('/', questController.createQuest);

module.exports = router;
