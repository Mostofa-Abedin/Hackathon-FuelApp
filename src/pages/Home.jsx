import React, { useState, useEffect } from 'react'; 
// Importing React and the useState hook. React is the core library, and useState manages state within this functional component.

import "../styles/styles.css";

// import Layout from '../components/layout.jsx'; 
// // Importing the Layout component to provide a consistent page structure with a Navbar and Footer.

// import MapComponent from '../components/MapComponent.jsx'; 
// // Importing the MapComponent to display an interactive map on the page.

// import SliderComponent from '../components/SliderComponent.jsx'; 
// // Importing the SliderComponent, which will allow users to adjust the search radius dynamically.

// import StationInfo from '../components/StationInfo.jsx'; 
// // Importing the StationInfo component to display details about petrol stations.

// import LocateMe from '../components/LocateMe.jsx'; 
// // Importing the StationInfo component to display details about petrol stations.


export default function Home() {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  // Function to get the user's location
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (err) => {
          setError(`Error: ${err.message}`);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };

  // Run this on component mount
  useEffect(() => {
    if ("geolocation" in navigator) {
      console.log("Geolocation is available in this browser.");
      getLocation(); // Call getLocation to fetch the location
    } else {
      console.log("Geolocation is NOT available in this browser.");
      setError("Geolocation is not available in this browser.");
    }
  }, []); // Empty dependency array ensures this runs only once

  return (
    <div>
      <h1>Welcome to FuelAPP</h1>
      {location ? (
        <p>
          Latitude: {location.latitude} <br />
          Longitude: {location.longitude}
        </p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <p>Fetching your location...</p>
      )}
    </div>
  );
}

