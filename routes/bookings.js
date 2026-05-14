const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const authenticateToken = require('../middleware/authMiddleware');

// Create booking
router.post('/', authenticateToken, bookingController.createBooking);

// Get user bookings
router.get('/', authenticateToken, bookingController.getUserBookings);

// Get booking by ID
router.get('/:id', authenticateToken, bookingController.getBookingById);

// Cancel booking
router.delete('/:id', authenticateToken, bookingController.cancelBooking);

module.exports = router;
