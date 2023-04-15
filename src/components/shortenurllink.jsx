import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ShortenedLink({ props }) {
  const [originalUrl, setOriginalUrl] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOriginalUrl = async () => {
      try {
        const response = await axios.get(`http://localhost:8082/api/v1/${props}`);
        setOriginalUrl(response.data.originalUrl);
        setError('');
      } catch (err) {
        setError(err.response.data.message);
      }
    };

    fetchOriginalUrl();
  }, [props]);

  return (
    <div>
      {originalUrl ? (
        <div>
          <p>You will be redirected to:</p>
          <link href={originalUrl}>{originalUrl}</link>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      {error && <p>Error: {error}</p>}
    </div>
  );
}

export default ShortenedLink;
