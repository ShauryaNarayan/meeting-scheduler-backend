const express = require('express');
const router = express.Router();
const userController = require('../interface/user.controller');

// Define the routes
router.post('/', userController.createUser); // POST /users
router.get('/:id', userController.getUser);  // GET /users/:id

module.exports = router;