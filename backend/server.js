require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const app = express();
const authRoutes = require('./task-service/routes/authRoutes'); // Import routes for authentication

// Middleware setup (optional)
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Use authentication routes
app.use('/', authRoutes); // Mount the auth routes, such as /callback

// Set up a basic home route (optional)
app.get('/', (req, res) => {
  res.send('Welcome to the Study Planner Backend!');
});

// Start the server
const PORT = process.env.PORT || 3000; // Use environment variable for port (defaults to 3000)
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
