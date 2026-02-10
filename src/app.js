const express = require('express');
const cors = require('cors');

// Import Routes
const userRoutes = require('./modules/user/routes/user.routes'); 
const meetingRoutes = require('./modules/meeting/routes/meeting.routes'); 

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parses incoming JSON requests

// Health Check Route (To confirm server is running)
app.get('/', (req, res) => {
  res.send('📅 Calendar Booking API is running...');
});

// Mount Module Routes
app.use('/users', userRoutes);       // User features (Create, Get)
app.use('/meetings', meetingRoutes); // Meeting features (Create, Book, Check Conflict)

module.exports = app;