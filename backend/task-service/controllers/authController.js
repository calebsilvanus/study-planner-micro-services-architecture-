const axios = require('axios');
const querystring = require('querystring');
const { AUTH0_DOMAIN, CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } = require('../../authentication-service/config/authConfig'); // Import configuration

// Handle the callback from Auth0 and exchange code for tokens
exports.callback = async (req, res) => {
  const { code, state } = req.query;

  // Validate 'code' and 'state' parameters
  if (!code || !state) {
    console.error('Missing code or state parameter');
    return res.status(400).send('Invalid callback parameters');
  }

  try {
    // Exchange authorization code for access and ID tokens
    const tokenResponse = await axios.post(
      `https://${AUTH0_DOMAIN}/oauth/token`,
      querystring.stringify({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code,
        redirect_uri: REDIRECT_URI,
        grant_type: 'authorization_code',
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    const { access_token, id_token } = tokenResponse.data;

    if (!access_token || !id_token) {
      console.error('Missing tokens in Auth0 response');
      return res.status(500).send('Failed to retrieve tokens from Auth0');
    }

    // Optionally store tokens in session or cookies (not shown here)

    // Redirect to frontend with access token
    res.redirect(`/study-planner?access_token=${access_token}`);
  } catch (error) {
    console.error(
      'Error during token exchange:',
      error.response?.data || error.message
    );
    res.status(500).send('Authentication failed during token exchange');
  }
};
