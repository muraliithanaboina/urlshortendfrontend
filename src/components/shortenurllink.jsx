import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ShortenedLink({ props }) {
  const [originalUrl, setOriginalUrl] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOriginalUrl = async () => {
      try {
        const response = await axios.get(`http://localhost:8082/api/v1/${props}`,{ crossdomain: true });
        console.log(response.data)
        setOriginalUrl(response.data);
        setError('');
      } catch (err) {
        setError(err.response.data.message);
      }
    };
    fetchOriginalUrl();
  }, [props]);

  const handleClick = () => {
 
    axios({
      method: 'get',
      url: `${originalUrl}`,
      withCredentials: false,
     
    });
  };

  return (
    <div>
      {originalUrl ? (
        <div>
          <p>You will be redirected to:</p>
         <a href={originalUrl} onClick={handleClick}>
            {originalUrl}
          </a>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      {error && <p>Error: {error}</p>}
    </div>
  );
}

export default ShortenedLink;
