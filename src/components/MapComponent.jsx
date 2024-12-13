import React, { useContext } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useGeolocation } from "../hooks/useGeolocation.jsx";
import { StationContext } from "../context/StationContext.jsx";

const MapComponent = () => {
  const { Location, Error } = useGeolocation();
  const { stations } = useContext(StationContext);

  if (!Location) {
    return <p>{Error || "Fetching location..."}</p>;
  }

  return (
    <div>
      <h1>Map Component</h1>
      <MapContainer
        center={[Location.latitude, Location.longitude]}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[Location.latitude, Location.longitude]}>
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
      </MapContainer>
    </div>
  );
};

export default MapComponent;
