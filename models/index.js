const sequelize = require('../config/database');
const User = require('./User');
const Quest = require('./Quest');
const TimeSlot = require('./TimeSlot');
const Booking = require('./Booking');

// Define associations
Quest.hasMany(TimeSlot, { foreignKey: 'questId' });
TimeSlot.belongsTo(Quest, { foreignKey: 'questId' });

User.hasMany(Booking, { foreignKey: 'userId' });
Booking.belongsTo(User, { foreignKey: 'userId' });

TimeSlot.hasMany(Booking, { foreignKey: 'timeSlotId' });
Booking.belongsTo(TimeSlot, { foreignKey: 'timeSlotId' });

module.exports = {
  sequelize,
  User,
  Quest,
  TimeSlot,
  Booking
};
