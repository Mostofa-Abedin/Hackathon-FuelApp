import React from 'react'; 
// Importing React to define and render components.

import "../styles/styles.css"; 
// Importing the stylesheet for the app.

import Credits from "../components/Credits.jsx"; // Footer Component

import LocateMe from '../components/LocateMe.jsx'; 
// Importing the LocateMe component to display the user's current location.

import MapComponent from '../components/MapComponent.jsx'; 
// Importing the MapComponent to display an interactive map on the page.



import StationInfo from '../components/StationInfo.jsx'; 
// Importing the StationInfo component to display details about petrol stations.

export default function Home() {
    return (
        <div className="container"> {/* Flexbox container */}

            {/* Div for Layout (Header, Navbar, Footer, etc.) */}
            <div className="credits">
                <Credits />
            </div>

            {/* Div for LocateMe Component */}
            <div className="locate-me">
                <LocateMe />
            </div>

            {/* Div for MapComponent */}
            <div className="map-component">
                <MapComponent />
            </div>

            {/* Div for SliderComponent */}
            {/* <div className="slider-component">
                <SliderComponent />
            </div> */}

            {/* Div for StationInfo */}
            <div className="station-info">
                <StationInfo />
            </div>
        </div>
    );
}