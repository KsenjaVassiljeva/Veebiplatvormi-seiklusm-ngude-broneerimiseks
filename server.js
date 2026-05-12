const express = require('express');
const cors = require('cors');
require('dotenv').config();
const path = require('path');

const { sequelize } = require('./models');
const authRoutes = require('./routes/auth');
const questRoutes = require('./routes/quests');
const timeSlotsRoutes = require('./routes/timeSlots');
const bookingRoutes = require('./routes/bookings');

const app = express();

// Middleware
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '.')));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/quests', questRoutes);
app.use('/api/time-slots', timeSlotsRoutes);
app.use('/api/bookings', bookingRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

// Serve HTML files
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 5000;

// Database sync and server start
sequelize.sync({ alter: false }).then(() => {
  console.log('Database synchronized');
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error('Failed to sync database:', err);
  process.exit(1);
});
