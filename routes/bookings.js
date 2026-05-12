const express = require('express');
const router = express.Router();
const { Booking, TimeSlot, Quest, User } = require('../models');
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Create booking
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { timeSlotId, numberOfPeople } = req.body;

    const timeSlot = await TimeSlot.findByPk(timeSlotId, { include: Quest });
    if (!timeSlot) {
      return res.status(404).json({ error: 'Time slot not found' });
    }

    if (timeSlot.availableSlots < numberOfPeople) {
      return res.status(400).json({ error: 'Not enough available slots' });
    }

    const totalPrice = numberOfPeople * timeSlot.Quest.pricePerPerson;

    const booking = await Booking.create({
      userId: req.userId,
      timeSlotId,
      numberOfPeople,
      totalPrice,
      status: 'confirmed'
    });

    // Update available slots
    await TimeSlot.decrement('availableSlots', {
      by: numberOfPeople,
      where: { id: timeSlotId }
    });

    res.status(201).json({
      success: true,
      booking: booking
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create booking' });
  }
});

// Get user bookings
router.get('/', authenticateToken, async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      where: { userId: req.userId },
      include: [
        { model: TimeSlot, include: [{ model: Quest }] },
        { model: User, attributes: ['id', 'email', 'firstName', 'lastName'] }
      ]
    });

    res.json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

// Get booking by ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const booking = await Booking.findByPk(req.params.id, {
      include: [
        { model: TimeSlot, include: [{ model: Quest }] },
        { model: User, attributes: ['id', 'email', 'firstName', 'lastName'] }
      ]
    });

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    if (booking.userId !== req.userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    res.json(booking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch booking' });
  }
});

// Cancel booking
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const booking = await Booking.findByPk(req.params.id);

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    if (booking.userId !== req.userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    // Restore available slots
    await TimeSlot.increment('availableSlots', {
      by: booking.numberOfPeople,
      where: { id: booking.timeSlotId }
    });

    await booking.destroy();

    res.json({ success: true, message: 'Booking cancelled' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to cancel booking' });
  }
});

module.exports = router;
