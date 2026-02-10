// src/server.js
require('dotenv').config(); // Load env vars
const app = require('./app');
const sequelize = require('./config/database');

const PORT = process.env.PORT || 3000;

async function startServer() {
try {
    // Test DB connection before starting
    await sequelize.authenticate();
    console.log('Database connected successfully.');

    // Sync models (creates tables if they don't exist)
    // In production, you would use migrations, but for this assignment, sync is acceptable for simplicity
    await sequelize.sync({ alter: true });
    console.log('Database models synced.');

    app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    });
} catch (error) {
    console.error('Unable to connect to the database:', error);
}
}

startServer();