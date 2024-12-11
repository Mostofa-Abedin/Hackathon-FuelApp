import React, { useState } from "react";
import { useGeolocation } from "../hooks/useGeolocation.jsx"; // Import Geolocation Hook

const LocateMe = () => {
  const { Location: location, Error: error } = useGeolocation();
  const [showLocation, setShowLocation] = useState(false); // State to control when to display location

  const handleLocateClick = () => {
    setShowLocation(true); // Set the flag to show the location
  };

  return (
    <div>
      <h1>Location Component</h1>
      <button onClick={handleLocateClick}>Locate Me</button>
      <h2>Your Location:</h2>
      
      {showLocation ? (
        location ? (
          <p>
            Latitude: {location.latitude} <br />
            Longitude: {location.longitude}
          </p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <p>Fetching your location...</p>
        )
      ) : (
        <p>Click "Locate Me" to fetch your location.</p>
      )}
    </div>
  );
};

export default LocateMe;
