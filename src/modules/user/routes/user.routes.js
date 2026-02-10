const express = require('express');
const router = express.Router();
const userController = require('../interface/user.controller');

// DEBUG: Check if functions are loaded correctly
if (!userController.createUser || !userController.getUser) {
    console.error("❌ CRITICAL ERROR: User Controller functions are missing!");
    console.log("Loaded Controller:", userController);
}

// Define the routes
router.post('/', userController.createUser);   // POST /users
router.get('/', userController.getAllUsers);   // GET /users (List all users)
router.get('/:id', userController.getUser);    // GET /users/:id (Get one user)

module.exports = router;