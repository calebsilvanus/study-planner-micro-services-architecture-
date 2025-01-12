const express = require('express'); // Express for handling HTTP requests
const bodyParser = require('body-parser'); // Middleware for parsing request bodies
const cors = require('cors'); // Middleware for handling cross-origin requests
const db = require('./services/firebaseService'); // Firebase connection
const taskRoutes = require('./routes/taskRoutes'); // Task routes

// Initialize Express app
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/api/tasks', taskRoutes); // Prefix routes with `/api/tasks`

// Test Firestore Connection (Optional)
app.get('/testFirestore', async (req, res) => {
    try {
        const testDoc = await db.collection('testCollection').add({ message: 'Hello Firestore!' });
        res.status(200).send(`Document written with ID: ${testDoc.id}`);
    } catch (error) {
        console.error('Error connecting to Firestore:', error);
        res.status(500).send('Error connecting to Firestore');
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Task Service is running on port ${PORT}`);
});
