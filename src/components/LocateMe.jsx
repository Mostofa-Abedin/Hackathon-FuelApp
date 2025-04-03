import React, { useState } from "react";
// Importing React to define and manage the component state.

import { useGeolocation } from "../hooks/useGeolocation.jsx";
// Importing the custom Geolocation Hook to fetch the user's location.

import { motion } from 'framer-motion';
// Importing motion from framer-motion for animations.

const LocateMe = () => {
  // Destructuring location and error from the geolocation hook.
  const { Location: location, Error: error } = useGeolocation();

  // State to control whether the user's location is displayed.
  const [showLocation, setShowLocation] = useState(false);

  // Function to handle the "Locate Me" button click.
  const handleLocateClick = () => {
    setShowLocation(true); // Enable display of the location.
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1>Location Component</h1>
      
      {/* Button to trigger location display */}
      <button onClick={handleLocateClick}>Locate Me</button>
      
      <h2>Your Location:</h2>
      
      {/* Conditional rendering to display the location or fallback messages */}
      {showLocation ? (
        location ? (
          // If the location is available, display latitude and longitude.
          <p>
            Latitude: {location.latitude} <br />
            Longitude: {location.longitude}
          </p>
        ) : error ? (
          // If there’s an error fetching the location, display the error message.
          <p>{error}</p>
        ) : (
          // If the location is being fetched, show a loading message.
          <p>Fetching your location...</p>
        )
      ) : (
        // If the user hasn’t clicked "Locate Me" yet, show a prompt.
        <p>Click "Locate Me" to fetch your location.</p>
      )}
    </motion.div>
  );
};

export default LocateMe;
// Exporting LocateMe component for use in other parts of the app.
