// Import Firebase and Auth0 SDKs
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { Auth0Provider } from '@auth0/auth0-react'; // Auth0 SDK import for React

// Firebase config
const firebaseConfig = {
  apiKey: " ",
  authDomain: " ",
  projectId: " ",
  storageBucket: " ",
  messagingSenderId: " ",
  appId: " ",
  measurementId: " "
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

// Auth0 config
const domain = " "; // Replace with your Auth0 domain
const clientId = " "; // Replace with your Auth0 client ID

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
