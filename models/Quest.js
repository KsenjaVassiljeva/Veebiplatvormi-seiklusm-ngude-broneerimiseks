const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Quest = sequelize.define('Quest', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  pricePerPerson: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  minPlayers: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  },
  maxPlayers: {
    type: DataTypes.INTEGER,
    defaultValue: 4
  },
  duration: {
    type: DataTypes.STRING(50),
    comment: 'Duration in format like "1h 30min"'
  },
  difficulty: {
    type: DataTypes.ENUM('Easy', 'Medium', 'Hard', 'Ultra hard'),
    defaultValue: 'Medium'
  },
  genre: {
    type: DataTypes.STRING(100),
    comment: 'Genre like Horror, Mystery etc'
  },
  rating: {
    type: DataTypes.DECIMAL(3, 1),
    defaultValue: 5.0
  },
  image: {
    type: DataTypes.STRING(255),
    allowNull: true
  }
}, {
  tableName: 'quests',
  timestamps: true,
  underscored: true,
  charset: 'utf8mb4'
});

module.exports = Quest;
