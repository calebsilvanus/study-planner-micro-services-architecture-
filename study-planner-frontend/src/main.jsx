import React from 'react';
import ReactDOM from 'react-dom/client'; // import from 'react-dom/client'
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';

const domain = 'studyplanner.eu.auth0.com';
const clientId = 'AchlRXK4bJq1e9ZVnPbKBdfRu07bYCw9';

// Create the root element
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the Auth0Provider wrapped around your App component
root.render(
  <Auth0Provider
  domain="studyplanner.eu.auth0.com"
  clientId="AchlRXK4bJq1e9ZVnPbKBdfRu07bYCw9"
  authorizationParams={{
    redirect_uri: window.location.origin + '/callback',
    audience: 'https://studyplanner.eu.auth0.com/api/v2/', // Add if using APIs
    scope: 'openid profile email read:profile write:tasks'
  }}
>
  <App />
</Auth0Provider>
);