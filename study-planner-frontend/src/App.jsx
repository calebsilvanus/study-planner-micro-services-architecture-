// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Callback from './pages/Callback'; // Auth0 Callback Page
import Planner from './components/Planner'; // Main Planner Page
import LoginPage from './pages/Login'; // Login Page

// Private Route Wrapper
const PrivateRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>; // Optional: Show a loader while Auth0 processes
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/callback" element={<Callback />} />
        
        {/* Private Route */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Planner />
            </PrivateRoute>
          }
        />
        
        {/* Catch-All Redirect */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
