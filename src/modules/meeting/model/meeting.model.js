const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/database');
const User = require('../../user/model/user.model'); // Import User to link them

const Meeting = sequelize.define('Meeting', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  startTime: {
    type: DataTypes.DATE, // Stores date and time
    allowNull: false,
  },
  endTime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User, // This links to the User table
      key: 'id',
    },
  },
}, {
  timestamps: true,
});

// Define Relationships
User.hasMany(Meeting, { foreignKey: 'userId' });
Meeting.belongsTo(User, { foreignKey: 'userId' });

module.exports = Meeting;