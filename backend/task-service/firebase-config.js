const { initializeApp } = require('firebase/app');
const { getFirestore } = require('firebase/firestore');

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDq1JKOCfQ4w87ZWraKLmzBbxQzWCBfH_o",
  authDomain: "task-service-2a607.firebaseapp.com",
  projectId: "task-service-2a607",
  storageBucket: "task-service-2a607.firebasestorage.app",
  messagingSenderId: "453707516793",
  appId: "1:453707516793:web:5a076cbade08f055643da8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

module.exports = { db };
