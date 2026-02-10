const User = require('../model/user.model');

const createUser = async (userData) => {
  try {
    return await User.create(userData);
  } catch (error) {
    throw error;
  }
};

const getUserById = async (id) => {
  try {
    return await User.findByPk(id); // findByPk = Find By Primary Key
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createUser,
  getUserById,
};