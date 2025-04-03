import React, { useState, useContext, useEffect } from 'react';
import { useApiRequest } from "../hooks/useApiRequest.jsx";
import { useGeolocation } from "../hooks/useGeolocation.jsx";
import { StationContext } from "../context/StationContext.jsx";
import { mergeStationData } from "../utils/mergeStationData.js";
import SliderComponent from '../components/SliderComponent.jsx';
import { toast } from 'react-toastify';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import { getAccessToken } from "../utils/tokenManager.js"; // ✅ only once



const StationInfo = () => {
  const { Location: location, Error: geoError } = useGeolocation();
  const { response, loading, error, sendRequest } = useApiRequest();
  const { setStations } = useContext(StationContext);

  const [fuelType, setFuelType] = useState("");
  const [radius, setRadius] = useState(1);
  const [sortBy, setSortBy] = useState("price");
  const [sortAscending, setSortAscending] = useState(true);

  const handleFuelTypeChange = (event) => {
    setFuelType(event.target.value);
  };

  const handleRadiusChange = (event) => {
    setRadius(Number(event.target.value));
  };

  const handleSortByChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleSortOrderChange = (event) => {
    setSortAscending(event.target.checked);
  };

  const handleRequest = async () => {
    if (!location || !fuelType) {
      toast.error("Please select a fuel type and allow location access.");
      return;
    }

    try {
      const apiKey = import.meta.env.VITE_API_KEY;
      const authHeader = import.meta.env.VITE_AUTH_HEADER;
      const token = await getAccessToken();

      if (!apiKey || !authHeader || !token) {
        toast.error("API credentials missing or token fetch failed.");
        return;
      }

      const config = {
        url: "https://api.onegov.nsw.gov.au/FuelPriceCheck/v1/fuel/prices/location",
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: `Bearer ${token}`,
          Apikey: apiKey,
          Transactionid: "7d15f0b3-1ebc-4c1b-90de-3a4b1da2d6c8",
          Requesttimestamp: new Date().toISOString(),
        },
        body: {
          fueltype: fuelType,
          namedlocation: "2216",
          latitude: location.latitude,
          longitude: location.longitude,
          radius: radius.toString(),
          sortby: sortBy,
          sortascending: sortAscending.toString(),
        },
      };

      sendRequest(config);
    } catch (error) {
      toast.error("Error fetching fuel prices.");
    }
  };

  useEffect(() => {
    if (response?.stations && response?.prices) {
      const merged = mergeStationData(response.stations, response.prices);
      setStations(merged);
      toast.success("Fuel stations loaded successfully!");
    }
  }, [response, setStations]);

  useEffect(() => {
    if (error) {
      toast.error(`Error: ${error}`);
    }
    if (geoError) {
      toast.error(`Geolocation Error: ${geoError}`);
    }
  }, [error, geoError]);

  return (
    <div>
      <h1>Station Information</h1>

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

      <SliderComponent
        label="Search Radius (km)"
        value={radius}
        onChange={handleRadiusChange}
        min={1}
        max={10}
        step={1}
      />

      <p>
        <label htmlFor="sortBy">Sort By:</label>
        <select id="sortBy" value={sortBy} onChange={handleSortByChange}>
          <option value="price">Price</option>
          <option value="distance">Distance</option>
        </select>
      </p>

      <p>
        <label htmlFor="sortAscending">Sort Ascending:</label>
        <input
          type="checkbox"
          id="sortAscending"
          checked={sortAscending}
          onChange={handleSortOrderChange}
        />
      </p>

      <button onClick={handleRequest} disabled={!location || !fuelType}>
        Fetch Fuel Prices
      </button>

      {loading && <LoadingSpinner />}

      {response?.stations && (
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
