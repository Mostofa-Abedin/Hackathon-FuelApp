import React, { useState, useContext, useEffect } from 'react'; 
// Import React and necessary hooks for state and context management.

import { useApiRequest } from "../hooks/useApiRequest.jsx"; 
// Custom hook for making API requests.

import { useGeolocation } from "../hooks/useGeolocation.jsx"; 
// Custom hook to fetch the user's geolocation.

import { StationContext } from "../context/StationContext.jsx"; 
// Importing the StationContext to share station data globally.

const StationInfo = () => {
  // Geolocation data and any errors from the useGeolocation hook.
  const { Location: location, Error: geoError } = useGeolocation();

  // API response, loading state, and errors from the custom API request hook.
  const { response, loading, error, sendRequest } = useApiRequest();

  // Context to store the list of stations globally.
  const { setStations } = useContext(StationContext); 

  // Local state to track the selected fuel type.
  const [fuelType, setFuelType] = useState(""); 

  // Updates the selected fuel type based on user input.
  const handleFuelTypeChange = (event) => {
    setFuelType(event.target.value); 
  };

  // Handles the API request to fetch station information.
  const handleRequest = () => {
    // Check if location and fuel type are available before proceeding.
    if (!location || !fuelType) {
      console.error("Location or fuel type not available. Cannot make API request.");
      return;
    }

    //-------------------------------Trying to make this section hidden while deployed and perhaps using Neon--------------------
    const token = "iz9J3lXH2GXv18E93cO5HIjDG1iA"
    // The token is currently hardcoded but should ideally be securely fetched during deployment.

    const config = {
      url: "https://api.onegov.nsw.gov.au/FuelPriceCheck/v1/fuel/prices/location",
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: `Bearer ${token}`, // Secure token for authorization.
        Apikey: "MjXGOnT3J4xlFlm8ISa8y9QT3USQOatT", // API key for the service.
        Transactionid: "7d15f0b3-1ebc-4c1b-90de-3a4b1da2d6c8", // Unique ID for the request.
        Requesttimestamp: new Date().toISOString(), // Current timestamp for the request.
      },
      body: {
        fueltype: fuelType, 
        namedlocation: "2216", 
        latitude: location.latitude, 
        longitude: location.longitude, 
        radius: "1", 
        sortby: "price", 
        sortascending: "true", 
      },
    };

    // Call the API request function with the configured request data.
    sendRequest(config); 
  };
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  // Updates the stations in the context whenever a valid response is received.
  if (response?.stations && response?.prices) {
    const mergedStations = response.stations.map((station) => {
      const priceInfo = response.prices.find((price) => price.stationcode === station.code);
      return {
        ...station,
        price: priceInfo ? priceInfo.price : "N/A",
      };
    });

    setStations(mergedStations); 
  }

  return (
    <div>
      <h1>Station Information</h1>

      {/* Dropdown for selecting fuel type */}
      <p>
        <label htmlFor="fuelType">Select Fuel Type:</label>
        <select id="fuelType" value={fuelType} onChange={handleFuelTypeChange}>
          <option value="">-- Select Fuel Type --</option>
          <option value="P95">P95</option>
          <option value="P98">P98</option>
          <option value="E10">E10</option>
          <option value="DL">Diesel</option>
        </select>
      </p>

      {/* Button to fetch fuel prices */}
      <button onClick={handleRequest} disabled={!location || !fuelType}>
        Fetch Fuel Prices
      </button>

      {/* Display loading, error, or geolocation error messages */}
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {geoError && <p>Geolocation Error: {geoError}</p>}

      {/* Show station information if available */}
      {response && (
        <div>
          <h2>Stations:</h2>
          <hr />
          {response.stations.map((station, index) => (
            <div key={index}>
              <p><strong>Name:</strong> {station.name}</p>
              <p><strong>Address:</strong> {station.address}</p>
              <p><strong>Fuel Price:</strong> {response.prices[index]?.price || "N/A"}</p>
              <hr />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StationInfo;
