import React from 'react';
import '../styles/LoadingSpinner.css'; // Create this next

const LoadingSpinner = () => {
  return (
    <div className="spinner-overlay">
      <div className="spinner"></div>
    </div>
  );
};

export default LoadingSpinner;
