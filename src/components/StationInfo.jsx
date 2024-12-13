import React, { useState } from 'react';
import { useApiRequest } from "../hooks/useApiRequest.jsx"; // Import API Request Hook
import { useGeolocation } from "../hooks/useGeolocation.jsx"; // Import Geolocation Hook
import { StationContext } from "../context/StationContext.jsx";

const StationInfo = () => {
  // Use Geolocation Hook to get location and error
  const { Location: location, Error: geoError } = useGeolocation();

  // Destructure the return values from the API Request Hook
  const { response, loading, error, sendRequest } = useApiRequest();
  // Access context to update stations
  const { setStations } = useContext(StationContext); 
  // State for selected fuel type
  const [fuelType, setFuelType] = useState("");

  // Function to handle fuel type selection
  const handleFuelTypeChange = (event) => {
    setFuelType(event.target.value); // Update state with selected fuel type
  };

  // Function to handle the API request trigger
  const handleRequest = () => {
    // Ensure location and fuel type are available before making the request
    if (!location || !fuelType) {
      console.error("Location or fuel type not available. Cannot make API request.");
      return;
    }

    //-------------------------------Trying to make this section hidden while deployed and perhaps using Neon--------------------
    const token = "KgtGuhGX94FhIyvPPfPMQQlUTpCD"; // Replace with the dynamic token

    const config = {
      url: "https://api.onegov.nsw.gov.au/FuelPriceCheck/v1/fuel/prices/location", // Endpoint URL
      method: "POST", // HTTP method
      headers: {
        "Content-Type": "application/json; charset=utf-8", // Specify the content type
        Authorization: `Bearer ${token}`, // Add token to Authorization header
        Apikey: "MjXGOnT3J4xlFlm8ISa8y9QT3USQOatT", // Dynamic API key
        Transactionid: "7d15f0b3-1ebc-4c1b-90de-3a4b1da2d6c8", // Transaction ID
        Requesttimestamp: new Date().toISOString(), // Use current timestamp
      },
      body: {
        fueltype: fuelType, // Use the selected fuel type
        namedlocation: "2216",
        latitude: location.latitude,
        longitude: location.longitude,
        radius: "1",
        sortby: "price",
        sortascending: "true",
      },
    };

    sendRequest(config); // Call the hook's function to make the API request
  };
  //-----------------------------------------------------------------Section----------------------------------------------------------//
  // Update context when response is available
  if (response?.stations) {
    setStations(response.stations);
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

      {/* Button to trigger API request */}
      <button onClick={handleRequest} disabled={!location || !fuelType}>
        Fetch Fuel Prices
      </button>

      {/* Show loading state */}
      {loading && <p>Loading...</p>}

      {/* Show error messages */}
      {error && <p>Error: {error}</p>}
      {geoError && <p>Geolocation Error: {geoError}</p>}

      {/* Show API response */}
      {response && (
        <div>
          <h2>Stations:</h2>
          {response.stations.map((station, index) => (
            <div key={index}>
              <p><strong>Name:</strong> {station.name}</p>
              <p><strong>Address:</strong> {station.address}</p>
              <p><strong>Fuel Price:</strong> {response.prices[index]?.price || "N/A"}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StationInfo;
