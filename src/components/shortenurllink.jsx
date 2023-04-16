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
    console.log("murali")
 
   axios.get(`${originalUrl}`,{ crossdomain: true });
  };

  return (
    <div>
      {originalUrl ? (
        <div>
       <a href={props} onClick={handleClick}>{props}</a>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      {error && <p>Error: {error}</p>}
    </div>
  );
}

export default ShortenedLink;
