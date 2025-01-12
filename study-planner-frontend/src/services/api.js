// Import Firebase and Auth0 SDKs
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { Auth0Provider } from '@auth0/auth0-react'; // Auth0 SDK import for React

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDq1JKOCfQ4w87ZWraKLmzBbxQzWCBfH_o",
  authDomain: "task-service-2a607.firebaseapp.com",
  projectId: "task-service-2a607",
  storageBucket: "task-service-2a607.firebasestorage.app",
  messagingSenderId: "453707516793",
  appId: "1:453707516793:web:5a076cbade08f055643da8",
  measurementId: "G-TNG7GP2MSW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

// Auth0 config
const domain = "studyplanner.eu.auth0.com"; // Replace with your Auth0 domain
const clientId = "AchlRXK4bJq1e9ZVnPbKBdfRu07bYCw9"; // Replace with your Auth0 client ID

// Function to provide Auth0 context to your app
const Auth0ProviderWrapper = ({ children }) => (
  <Auth0Provider
    domain={domain}
    clientId={clientId}
    redirectUri={window.location.origin}
  >
    {children}
  </Auth0Provider>
);

export { firestore, setDoc, doc, Auth0ProviderWrapper };
