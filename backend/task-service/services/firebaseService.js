const admin = require('firebase-admin');
const serviceAccount = require('./firebaseKey.json');

// Check if Firebase app is already initialized
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://task-service-2a607.firebaseio.com" // Replace with your Firebase project ID
    });
}

const db = admin.firestore(); // Initialize Firestore

// Middleware to Verify Firebase Auth Token
const verifyIdToken = async (req, res, next) => {
    const token = req.headers.authorization?.split('Bearer ')[1];
    if (!token) {
        return res.status(401).send({ error: 'Unauthorized: No token provided' });
    }

    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        req.user = decodedToken; // Attach user data to the request
        next();
    } catch (error) {
        res.status(401).send({ error: 'Unauthorized', details: error.message });
    }
};

module.exports = { db, verifyIdToken }; // Export Firestore and middleware
