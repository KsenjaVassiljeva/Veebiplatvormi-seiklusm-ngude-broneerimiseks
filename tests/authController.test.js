const { login } = require('../controllers/authController');
const { User } = require('../models');
const jwt = require('jsonwebtoken');

jest.mock('../models', () => ({
  User: {
    findOne: jest.fn()
  }
}));
jest.mock('jsonwebtoken');

describe('Auth Controller - login', () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {
        email: 'test@example.com',
        password: 'password123'
      }
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    process.env.JWT_SECRET = 'test-secret';
    jest.clearAllMocks();
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    console.error.mockRestore();
  });

  it('should return 400 if email or password is missing', async () => {
    req.body = { email: 'test@example.com' };
    await login(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Email and password required' });
  });

  it('should return 401 if user is not found', async () => {
    User.findOne.mockResolvedValue(null);
    await login(req, res);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'Invalid credentials' });
  });

  it('should return 401 if password does not match', async () => {
    const mockUser = {
      comparePassword: jest.fn().mockResolvedValue(false)
    };
    User.findOne.mockResolvedValue(mockUser);
    
    await login(req, res);
    
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'Invalid credentials' });
  });

  it('should return 200 and token if credentials are valid', async () => {
    const mockUser = {
      id: 1,
      email: 'test@example.com',
      firstName: 'John',
      lastName: 'Doe',
      comparePassword: jest.fn().mockResolvedValue(true)
    };
    User.findOne.mockResolvedValue(mockUser);
    jwt.sign.mockReturnValue('mock-token');

    await login(req, res);

    expect(res.json).toHaveBeenCalledWith({
      success: true,
      token: 'mock-token',
      user: {
        id: 1,
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe'
      }
    });
  });

  it('should return 500 if an error occurs', async () => {
    User.findOne.mockRejectedValue('Database error');
    await login(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Login failed' });
  });
});
