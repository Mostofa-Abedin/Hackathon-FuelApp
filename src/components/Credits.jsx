import React from 'react';
// Importing React to define and render the Credits component.

const Credits = () => {
  return (
    <footer>
      {/* App name section */}
      <h1><strong>FuelApp</strong></h1>
      
      {/* Acknowledgment for the API used */}
      <p>
        Powered by:
        <br />
        <a 
          href="https://api.onegov.nsw.gov.au" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          Service NSW Fuel API
        </a>
      </p>
      <p>
        Developed by: <strong>Shekh Mostofa Abedin</strong>
      </p>
      
      <p>
        {new Date().getFullYear()} FuelApp © All rights reserved.
      </p>
    </footer>
  );
};

export default Credits;
// Exporting the Credits component for use as the app footer.
