const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const TimeSlot = sequelize.define('TimeSlot', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  questId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Quests',
      key: 'id'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  time: {
    type: DataTypes.TIME,
    allowNull: false
  },
  availableSlots: {
    type: DataTypes.INTEGER,
    defaultValue: 4
  },
  isAvailable: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'timeslots',
  timestamps: true,
  underscored: true,
  charset: 'utf8mb4',
  indexes: [
    {
      unique: true,
      fields: ['quest_id', 'date', 'time']
    }
  ]
});

module.exports = TimeSlot;
