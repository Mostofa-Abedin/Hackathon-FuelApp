import React from 'react';

const Credits = () => {
  return (
    <footer>
      <h1><strong>FuelApp</strong></h1>
      <p>
        Powered by:
        <br />
        <a href="https://api.onegov.nsw.gov.au" target="_blank" rel="noopener noreferrer">
          Service NSW Fuel API
        </a>
      </p>
      <p>Developed by: <strong>Shekh Mostofa Abedin</strong></p>
      <p> {new Date().getFullYear()} FuelApp © All rights reserved.</p>
    </footer>
  );
};

export default Credits;
