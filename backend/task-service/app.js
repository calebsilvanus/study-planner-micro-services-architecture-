const express = require('express');
const taskRoutes = require('./routes/taskRoutes');
const firebase = require('firebase/app'); // Import Firebase
const firebaseConfig = require('./firebase-config'); // Firebase Config

// Initialize Firebase
// firebase.initializeApp(firebaseConfig);

console.log('✅ Firebase initialized successfully!');

const app = express();

// Middleware to parse JSON requests
app.use(express.json()); 

// Task Routes
app.use('/api/tasks', taskRoutes);

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
