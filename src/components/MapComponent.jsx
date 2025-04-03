import React, { useContext, useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useGeolocation } from "../hooks/useGeolocation.jsx";
import { StationContext } from "../context/StationContext.jsx";
import L from "leaflet";
import redIconImage from "../assets/red_icon.png";
import "../styles/MapComponent.css";
import { motion } from "framer-motion";

const redIcon = new L.Icon({
  iconUrl: redIconImage,
  iconRetinaUrl: redIconImage,
  iconSize: [25, 45],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

// ✅ Helper component to re-center map
const RecenterMap = ({ lat, lng }) => {
  const map = useMap();
  useEffect(() => {
    if (lat && lng) {
      map.setView([lat, lng], 13);
    }
  }, [lat, lng, map]);
  return null;
};

const MapComponent = () => {
  const { Location, Error } = useGeolocation();
  const { stations } = useContext(StationContext);

  const [showLocation, setShowLocation] = useState(false);

  const handleLocateClick = () => {
    setShowLocation(true);
  };

  if (!Location) {
    return <p>{Error || "Fetching location..."}</p>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1>Map Component</h1>

      {/* Locate Me Button */}
      <button onClick={handleLocateClick} style={{ marginBottom: "1rem" }}>
        Locate Me
      </button>

      <MapContainer
        center={[Location.latitude, Location.longitude]}
        zoom={13}
        scrollWheelZoom={true}
        className="map-component"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker
          position={[Location.latitude, Location.longitude]}
          icon={redIcon}
        >
          <Popup>Your Location</Popup>
        </Marker>

        {stations.map((station, index) => (
          <Marker
            key={index}
            position={[station.location.latitude, station.location.longitude]}
          >
            <Popup>
              <strong>{station.name}</strong>
              <br />
              {station.address}
              <br />
              Fuel Price: {station.price || "N/A"}
              <hr />
            </Popup>
          </Marker>
        ))}

        {/* Recenter the map when Locate Me is clicked */}
        {showLocation && (
          <RecenterMap lat={Location.latitude} lng={Location.longitude} />
        )}
      </MapContainer>
    </motion.div>
  );
};

export default MapComponent;
