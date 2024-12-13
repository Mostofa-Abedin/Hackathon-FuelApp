import React, { useContext } from "react";
// Importing React and the useContext hook to access shared data.

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// Importing components from react-leaflet to display the map and markers.

import "leaflet/dist/leaflet.css";
// Importing Leaflet's CSS for proper map styling.

import { useGeolocation } from "../hooks/useGeolocation.jsx";
// Custom hook to get the user's geolocation.

import { StationContext } from "../context/StationContext.jsx";
// Context to access globally shared station data.

import L from "leaflet";
// Importing Leaflet to customize map icons.

import redIconImage from "../assets/red_icon.png";
// Custom icon image for marking the user's location.

// Creating a custom red icon for the user's location.
const redIcon = new L.Icon({
  iconUrl: redIconImage, // Path to the custom red icon image.
  iconRetinaUrl: redIconImage, // Retina version for higher resolution displays.
  iconSize: [25, 45], // The size of the icon.
  iconAnchor: [12, 41], // Anchor point of the icon on the map.
  popupAnchor: [1, -34], // Position of the popup relative to the icon.
});

const MapComponent = () => {
  // Fetch the user's location and any errors using the geolocation hook.
  const { Location, Error } = useGeolocation();

  // Access the stations data from the global StationContext.
  const { stations } = useContext(StationContext);

  // If the user's location isn't available yet, display a fallback message.
  if (!Location) {
    return <p>{Error || "Fetching location..."}</p>;
  }

  return (
    <div>
      <h1>Map Component</h1>

      {/* Initializing the map container with user's location as the center. */}
      <MapContainer
        center={[Location.latitude, Location.longitude]} // Center the map on user's location.
        zoom={13} // Set the zoom level for the map.
        scrollWheelZoom={true} // Enable scroll wheel zoom.
        style={{ height: "280px", width: "100%" }} // Define map size.
      >
        {/* Adding tiles from OpenStreetMap for the map's base layer. */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Adding a marker for the user's location using the custom red icon. */}
        <Marker position={[Location.latitude, Location.longitude]} icon={redIcon}>
          <Popup>Your Location</Popup>
        </Marker>

        {/* Rendering markers for each station. */}
        {stations.map((station, index) => (
          <Marker
            key={index} // Ensure each marker has a unique key.
            position={[station.location.latitude, station.location.longitude]} // Set station's coordinates.
          >
            {/* Displaying station details in a popup. */}
            <Popup>
              <strong>{station.name}</strong>
              <br />
              {station.address}
              <br />
              Fuel Price: {station.price || "N/A"} {/* Show price or fallback if not available. */}
              <hr /> {/* Add a line break for better readability. */}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
// Exporting the MapComponent for use in other parts of the app.
