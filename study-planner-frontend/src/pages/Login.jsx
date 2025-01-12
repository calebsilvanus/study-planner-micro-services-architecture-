import React from 'react';
import { Button, Box, Paper, Typography } from '@mui/material';
import './Login.css';
import { useAuth0 } from '@auth0/auth0-react'; // Use Auth0 React SDK

const Login = () => {
  const { loginWithRedirect } = useAuth0(); //  for redirecting user to Auth0 for login

  return (
    <Box className="login-container">
      <Paper className="login-form" elevation={5}>
        <Typography variant="h4" className="login-header">Weekly Study Planner</Typography>
        <Typography variant="body2" color="textSecondary" className="login-subheader">
          Please log in using your university account
        </Typography>

        {/* OAuth Login Button */}
        <Box mt={4}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => loginWithRedirect()} // This triggers Auth0's login process
            className="oauth-button"
          >
            Login with University Account
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;


// import React, { useState } from 'react';
// import { Button, Box, Paper, Typography, TextField } from '@mui/material';
// import { useAuth0 } from '@auth0/auth0-react'; // Use Auth0 React SDK
// import './Login.css';

// const Login = () => {
//   const { loginWithRedirect } = useAuth0(); // Hook for redirecting user to Auth0 for login
//   const [email, setEmail] = useState(''); // State for email input

//   const handleLogin = () => {
//     // Check if email ends with @final.edu.tr
//     if (email.endsWith('@final.edu.tr')) {
//       loginWithRedirect(); // Redirect to Auth0 login
//     } else {
//       alert('Only @final.edu.tr email addresses are allowed to log in.'); // Show alert for invalid email
//     }
//   };

//   return (
//     <Box className="login-container">
//       <Paper className="login-form" elevation={5}>
//         <Typography variant="h4" className="login-header">Weekly Study Planner</Typography>
//         <Typography variant="body2" color="textSecondary" className="login-subheader">
//           Please log in using your university account
//         </Typography>

//         {/* Email Input and Login Button */}
//         <Box mt={4}>
//           <TextField
//             label="Email"
//             variant="outlined"
//             fullWidth
//             value={email}
//             onChange={(e) => setEmail(e.target.value)} // Set email state on input change
//             placeholder="Enter your email"
//             type="email"
//           />
//           <Button
//             variant="contained"
//             color="primary"
//             fullWidth
//             onClick={handleLogin} // Trigger login process with validation
//             className="oauth-button"
//             style={{ marginTop: '16px' }}
//           >
//             Login with University Account
//           </Button>
//         </Box>
//       </Paper>
//     </Box>
//   );
// };

// export default Login;
