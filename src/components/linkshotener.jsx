import React, { useState } from 'react';
import axios from 'axios';
import '../link.css'
import ShortenedLink from "./shortenurllink.jsx"


function LinkShortener() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the input URL here (e.g. check for valid format)

    try {
      const response = await axios.post('http://localhost:8082/api/v1/shorten', { originalUrl });
      console.log(response.data)
      setShortenedUrl(response.data.shortenedUrl);
      
      setError('');

    } catch (err) {
      setShortenedUrl('');
      setError(err.response.data.message);
      console.log(err)
    }
  };
  

  return (
    
    <div className='shortfrom'>
      
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter URL"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
        />
        <button   type="submit">Shorten</button>
      </form>
     
       {shortenedUrl && (
        <div>
         
          <ShortenedLink props={shortenedUrl}/>
          
         
        </div>
      )}
      
   
      {error && <p>Error: {error}</p>}
    </div>
  
  );
}

export default LinkShortener;
