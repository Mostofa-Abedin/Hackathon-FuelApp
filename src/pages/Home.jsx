import React from 'react';
// Essential React import to define and render components.

import "../styles/styles.css";
// Styling for the entire application is brought in here.

import Credits from "../components/Credits.jsx";
// Footer component to display app credits and acknowledgments.

import LocateMe from '../components/LocateMe.jsx';
// Component to fetch and display the user's current location.

import MapComponent from '../components/MapComponent.jsx';
// Interactive map component to visualize the user's location and nearby fuel stations.

import StationInfo from '../components/StationInfo.jsx';
// Component to show information about nearby petrol stations, like name and price.

export default function Home() {
    return (
        <div className="container"> 
            {/* Main container using Flexbox for layout and spacing */}

            <div className="credits">
                {/* Footer section for app credits */}
                <Credits />
            </div>

            <div className="locate-me">
                {/* Section for the LocateMe component */}
                <LocateMe />
            </div>

            <div className="map-component">
                {/* Section for displaying the interactive map */}
                <MapComponent />
            </div>

            {/* This is where the slider component would go if it were being used */}
            {/* <div className="slider-component">
                <SliderComponent />
            </div> */}

            <div className="station-info">
                {/* Section for showing fuel station information */}
                <StationInfo />
            </div>
        </div>
    );
}
