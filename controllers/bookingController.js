const { Booking, TimeSlot, Quest, User } = require('../models');

exports.createBooking = async (req, res) => {
  try {
    const { timeSlotId, numberOfPeople } = req.body;

    const timeSlot = await TimeSlot.findByPk(timeSlotId, { include: Quest });
    if (!timeSlot) {
      return res.status(404).json({ error: 'Time slot not found' });
    }

    if (!timeSlot.isAvailable) {
      return res.status(400).json({ error: 'This time slot is already booked' });
    }

    const totalPrice = numberOfPeople * timeSlot.Quest.pricePerPerson;

    const booking = await Booking.create({
      userId: req.userId,
      timeSlotId,
      numberOfPeople,
      totalPrice,
      status: 'confirmed'
    });

    // Mark time slot as unavailable (Private booking policy)
    await timeSlot.update({
      isAvailable: false,
      availableSlots: 0
    });

    res.status(201).json({
      success: true,
      booking: booking
    });
  } catch (error) {
    console.error(error);
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ error: 'This time slot is already booked' });
    }
    res.status(500).json({ error: 'Failed to create booking' });
  }
};

exports.getUserBookings = async (req, res) => {
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
};

exports.getBookingById = async (req, res) => {
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
};

exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findByPk(req.params.id);

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    if (booking.userId !== req.userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    // Restore available slots
    await TimeSlot.update({
      isAvailable: true,
      availableSlots: 4 // Or the default max players
    }, {
      where: { id: booking.timeSlotId }
    });

    await booking.destroy();

    res.json({ success: true, message: 'Booking cancelled' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to cancel booking' });
  }
};
