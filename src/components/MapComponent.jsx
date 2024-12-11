import React, { useState } from 'react'; 
// Importing required components from react-leaflet
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Import Leaflet's CSS for proper styling

const MapComponent = () => {
    return (
        <div id="map">
            <h1>Map Component</h1>
            {/* Initialize the Leaflet map */}
            <MapContainer 
                center={[51.505, -0.09]} 
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
                <Marker position={[51.505, -0.09]}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    );
};

export default MapComponent;
// Exporting MapComponent for use in the Home page.
