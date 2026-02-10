const express = require('express');
const cors = require('cors');
require('dotenv').config();

// IMPORT FROM YOUR NEW INDEX FOLDERS
// Node.js automatically looks for the 'index.js' file inside these folders.
const meetingModule = require('./modules/meeting/index');
const userModule = require('./modules/user/index');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
// We access '.routes' because your index.js exports an object: { routes, service, controller }
app.use('/meetings', meetingModule.routes);
app.use('/users', userModule.routes);

// Default Route (Health Check)
app.get('/', (req, res) => {
  res.send('📅 Calendar Booking API is running...');
});

// Global Error Handler (Optional but recommended)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

module.exports = app;