const { createBooking } = require('../controllers/bookingController');
const { Booking, TimeSlot } = require('../models');

jest.mock('../models', () => ({
  Booking: {
    create: jest.fn()
  },
  TimeSlot: {
    findByPk: jest.fn()
  }
}));

describe('Booking Controller - createBooking', () => {
  let req, res;

  beforeEach(() => {
    req = {
      userId: 1,
      body: {
        timeSlotId: 10,
        numberOfPeople: 2
      }
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    jest.clearAllMocks();
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    console.error.mockRestore();
  });

  it('should return 404 if time slot is not found', async () => {
    TimeSlot.findByPk.mockResolvedValue(null);
    await createBooking(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Time slot not found' });
  });

  it('should return 400 if time slot is already booked', async () => {
    TimeSlot.findByPk.mockResolvedValue({ isAvailable: false });
    await createBooking(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'This time slot is already booked' });
  });

  it('should create a booking and update time slot if available', async () => {
    const mockTimeSlot = {
      isAvailable: true,
      Quest: { pricePerPerson: 25 },
      update: jest.fn().mockResolvedValue({})
    };
    TimeSlot.findByPk.mockResolvedValue(mockTimeSlot);
    Booking.create.mockResolvedValue({ id: 100, totalPrice: 50 });

    await createBooking(req, res);

    expect(Booking.create).toHaveBeenCalledWith({
      userId: 1,
      timeSlotId: 10,
      numberOfPeople: 2,
      totalPrice: 50,
      status: 'confirmed'
    });
    expect(mockTimeSlot.update).toHaveBeenCalledWith({
      isAvailable: false,
      availableSlots: 0
    });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      booking: { id: 100, totalPrice: 50 }
    });
  });

  it('should return 500 if an error occurs', async () => {
    TimeSlot.findByPk.mockRejectedValue('Database error');
    await createBooking(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Failed to create booking' });
  });
});
