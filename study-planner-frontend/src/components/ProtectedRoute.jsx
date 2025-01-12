import { useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';

function FetchData() {
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = await getAccessTokenSilently({
          audience: 'https://studyplanner.eu.auth0.com/api/v2/',
          scope: 'read:profile',
        });

        const response = await fetch('https://your-api-endpoint.com/data', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [getAccessTokenSilently]);

  return <div>Data is being fetched...</div>;
}
