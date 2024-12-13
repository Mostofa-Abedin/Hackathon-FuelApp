import React from 'react';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#f4f4f4', padding: '10px', textAlign: 'center', marginTop: '20px' }}>
      <p><strong>FuelApp</strong></p>
      <p>
        Powered by:
        <br />
        <a href="https://api.onegov.nsw.gov.au" target="_blank" rel="noopener noreferrer">
          Service NSW Fuel API
        </a>
      </p>
      <p>Developed by: <strong>Your Name</strong></p>
      <p>© {new Date().getFullYear()} FuelApp. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
