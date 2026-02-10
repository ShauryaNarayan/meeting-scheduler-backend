const userService = require('../service/user.service');
const { validateCreateUser } = require('../dto/user.dto');

// 1. Create User
const createUser = async (req, res) => {
  try {
    const validationErrors = validateCreateUser(req.body);
    if (validationErrors) {
        return res.status(400).json({ message: "Validation Failed", errors: validationErrors });
    }

    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    if (error.message === 'Email already exists') {
        return res.status(409).json({ message: error.message });
    }
    res.status(500).json({ error: error.message });
  }
};

// 2. Get ALL Users
const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 3. Get Single User by ID (THIS WAS MISSING)
const getUser = async (req, res) => {
  try {
    // We assume your service has a method for this.
    // If not, we will need to add it to user.service.js too.
    // For now, let's try to fetch it.
    const user = await userService.getUserById(req.params.id);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// EXPORT ALL THREE FUNCTIONS
module.exports = {
  createUser,
  getAllUsers,
  getUser
};