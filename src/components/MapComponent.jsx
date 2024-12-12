import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'; // Importing required components from react-leaflet
import 'leaflet/dist/leaflet.css'; // Import Leaflet's CSS for proper styling
import { useGeolocation } from "../hooks/useGeolocation.jsx"; // Import Geolocation Hook

const MapComponent = () => {
  const { Location, Error } = useGeolocation(); // Destructure Location and Error from the hook

  // Handle cases where Location is not yet available
  if (!Location) {
    return <p>{Error || "Fetching location..."}</p>;
  }

  return (
    <div>
      <h1>Map Component</h1>
      {/* Initialize the Leaflet map */}
      <MapContainer
        center={[Location.latitude, Location.longitude]} // Use latitude and longitude for the center
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: "400px", width: "100%" }} // Set map dimensions
      >
        {/* Add map tiles */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* Add a marker */}
        <Marker position={[Location.latitude, Location.longitude]}>
          <Popup>
            Your Location: {Location.latitude}, {Location.longitude}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapComponent;
