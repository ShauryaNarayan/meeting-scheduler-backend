const express = require('express');
const cors = require('cors');

// Import Routes
const userRoutes = require('./modules/user/routes/user.routes');
const meetingRoutes = require('./modules/meeting/routes/meeting.routes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('📅 Calendar Booking API is running...');
});

app.use('/users', userRoutes);
app.use('/meetings', meetingRoutes);

module.exports = app;