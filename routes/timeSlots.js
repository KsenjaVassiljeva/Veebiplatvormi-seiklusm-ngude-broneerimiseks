const express = require('express');
const router = express.Router();
const { TimeSlot, Quest } = require('../models');

// Get all available slots for a quest
router.get('/quest/:questId', async (req, res) => {
  try {
    const slots = await TimeSlot.findAll({
      where: { questId: req.params.questId },
      include: [{ model: Quest, attributes: ['id', 'title', 'pricePerPerson'] }]
    });
    res.json(slots);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch time slots' });
  }
});

// Get available slots for specific date range
router.get('/quest/:questId/available', async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const where = { questId: req.params.questId, isAvailable: true };

    if (startDate && endDate) {
      where.date = {
        [require('sequelize').Op.between]: [new Date(startDate), new Date(endDate)]
      };
    }

    const slots = await TimeSlot.findAll({ where });
    res.json(slots);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch available slots' });
  }
});

// Create time slot (admin only)
router.post('/', async (req, res) => {
  try {
    const { questId, date, time, availableSlots } = req.body;

    const slot = await TimeSlot.create({
      questId,
      date,
      time,
      availableSlots
    });

    res.status(201).json(slot);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create time slot' });
  }
});

module.exports = router;
