const { TimeSlot, Quest } = require('../models');
const { Op } = require('sequelize');

exports.getSlotsByQuest = async (req, res) => {
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
};

exports.getAvailableSlots = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const where = { questId: req.params.questId, isAvailable: true };

    if (startDate && endDate) {
      where.date = {
        [Op.between]: [new Date(startDate), new Date(endDate)]
      };
    }

    const slots = await TimeSlot.findAll({ where });
    res.json(slots);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch available slots' });
  }
};

exports.createTimeSlot = async (req, res) => {
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
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ error: 'Time slot already exists for this quest and time' });
    }
    res.status(500).json({ error: 'Failed to create time slot' });
  }
};
