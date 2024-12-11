import React, { useState, useEffect } from 'react'; 
// Importing React and the useState hook. React is the core library, and useState manages state within this functional component.

import "../styles/styles.css";

// import Layout from '../components/layout.jsx'; 
// // Importing the Layout component to provide a consistent page structure with a Navbar and Footer.

// import MapComponent from '../components/MapComponent.jsx'; 
// // Importing the MapComponent to display an interactive map on the page.

// import SliderComponent from '../components/SliderComponent.jsx'; 
// // Importing the SliderComponent, which will allow users to adjust the search radius dynamically.

// import StationInfo from '../components/StationInfo.jsx'; 
// // Importing the StationInfo component to display details about petrol stations.

import LocateMe from '../components/LocateMe.jsx'; 
// Importing the LocateMe component to display current location of user.


export default function Home() {
    return (
      <div>
        <h1></h1>
        <LocateMe /> {/* Use the LocateMe component */}
      </div>
    );
  }

