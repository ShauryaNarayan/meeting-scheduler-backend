const User = require('../model/user.model');

// 1. Create a new User
const createUser = async (userData) => {
  try {
    const user = await User.create(userData);
    return user;
  } catch (error) {
    // Check if error is due to duplicate email (Sequelize Unique Constraint)
    if (error.name === 'SequelizeUniqueConstraintError') {
      throw new Error('Email already exists');
    }
    throw error;
  }
};

// 2. Get All Users
const getAllUsers = async () => {
  try {
    const users = await User.findAll();
    return users;
  } catch (error) {
    throw error;
  }
};

// 3. Get Single User by ID (Added this to fix your error)
const getUserById = async (id) => {
  try {
    const user = await User.findByPk(id); // findByPk = Find By Primary Key
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
};