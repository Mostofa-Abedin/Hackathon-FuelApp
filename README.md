# Hackathon-FuelApp

## Intro

AReact-based web application that helps users locate petrol stations within a customizable radius. It uses geolocation and map integration to provide a seamless and user-friendly experience.

## Features

Geolocation: Automatically fetches the user's current location.
Interactive Map: Displays nearby petrol stations on a dynamic map.
Radius Adjustment: Allows users to set a custom search radius using a slider.
API Integration: Fetches real-time petrol station data using the NSW Fuel API.

## Prerequisites

- Node.js (v16 or higher recommended)
- npm
- Git

## Installation

```bash
git clone https://github.com/Mostofa-Abedin/Hackathon-FuelApp.git
cd Hackathon-FuelApp
```

# **Looking for Team-mates**

A bit late to the game and still fuzzy on some React concepts, but as Aamod wisely said, _those who do nothing gain nothing._ 💡 I'm looking for **2-3 teammates** who’d like to learn as we build. Let's see how far we can get! I have very little expectations except that we try.

---

## **The Idea**

I'm creating an application that helps users locate **nearby petrol stations** based on their current location and a **customizable search radius.** with additional features that will revel themselves as we progress.

---

## **Core Features**

### 🎯 **Locate User's Position**

- Uses the **Geolocation API** to determine the user's current location. Documentation:  
  [https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API)
- Dynamically centers an **interactive map** on the user's position.

### 🌍 **Interactive Map**

- Displays an interactive map using **React-Leaflet**, enabling users to explore nearby areas. Documentation:  
  [https://react-leaflet.js.org/docs/start-introduction](https://react-leaflet.js.org/docs/start-introduction)  
  Leaflet API Reference:  
  [https://leafletjs.com/](https://leafletjs.com/)
- Includes a marker for the user’s current location.

- **Alternative Option**: We could also use **Google Maps API**, which offers extensive features like detailed directions and advanced styling. However, it comes with **rate limits and pricing considerations.** This is a potential enhancement to explore later.  
  Google Maps API Documentation:  
  [https://developers.google.com/maps/documentation](https://developers.google.com/maps/documentation)

### ⛽ **Find Nearby Petrol Stations**

- Fetches petrol station data (e.g., names, locations, prices) from the **NSW Fuel API**. API Details:  
  [https://api.nsw.gov.au/Product/Index/22](https://api.nsw.gov.au/Product/Index/22)
- Dynamically displays petrol stations as markers on the map within a **customizable radius.**

### 🔄 **Radius Adjustment**

- Includes a slider to adjust the search radius (e.g., 5 km, 10 km, etc.).
- Automatically updates the map and petrol station data based on the selected radius.

### 📋 **Basic Station Details**

- Displays key details about each petrol station, such as:
  - **Name**
  - **Location**
  - **Fuel price** (where available)

---

### **Project Structure & Collaboration Plan**

#### **Components**

1. **Map Component**
   - Displays an interactive map centered on the user's location.
2. **Marker Component**
   - Adds dynamic markers for user location and petrol stations.
3. **Slider Component**
   - Allows users to adjust the search radius visually.
4. **Petrol Station Details**
   - Shows station name, price, and location.

#### **State Management**

- Local states for slider value, user location, and map zoom levels.
- Shared states (if needed) for petrol station data using React Context or a custom hook.

#### **Hooks**

Hooks will be **custom-built** for the project . My thoughts

- **useGeolocation**: Fetches user location using the [Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API).
- **useFetchStations**: Integrates with the [NSW Fuel API](https://api.nsw.gov.au/Product/Index/22) to fetch station data.
- **useSlider**: Manages slider value and dynamically updates the map based on radius.

#### **Utilities**

- **API Utility**: Centralized functions to handle API calls and response validation.
- **Map Utility**: Manages map interactions and dynamic marker updates using [React-Leaflet](https://react-leaflet.js.org/).
- **Error Handling Utility**: Ensures consistent error messages across the app.

#### **Frameworks/Libraries**

- **React**: The core framework for building the app.
  - Documentation: [React Official Docs](https://reactjs.org/docs/getting-started.html)
- **React-Leaflet**: For map rendering and marker interactions.
  - Documentation: [React-Leaflet Documentation](https://react-leaflet.js.org/)
- **Tailwind CSS**: For responsive and utility-first styling.
  - Documentation: [Tailwind CSS Documentation](https://tailwindcss.com/docs)

#### **External APIs**

- **NSW Fuel API**: Provides data on petrol stations in New South Wales, including locations and fuel prices.
  - Documentation: [NSW FuelCheck API](https://api.nsw.gov.au/Product/Index/22)
- **Google Maps API** (optional): Alternative for map rendering with additional features but rate limits may apply.
  - Documentation: [Google Maps API Docs](https://developers.google.com/maps/documentation)

#### **Work Distribution Plan**

If 2-3 teammates join, tasks can be efficiently divided:

1. **Backend/API Integration**:

   - Integrate the NSW Fuel API for data fetching.
   - Create reusable utilities for API calls and error handling.
   - Develop the `useFetchStations` hook.

2. **Frontend & Components**:

   - Build the interactive Map, Marker, and Slider components.
   - Style the UI for responsiveness and usability using Tailwind CSS.
   - Create the Petrol Station Details component for displaying station information.

3. **State Management & Custom Hooks**:
   - Develop custom hooks like `useGeolocation` and `useSlider`.
   - Manage global state for user location, radius, and petrol station data.
   - Test functionality across different devices and browsers.

#### **JIRA Board Ready**

A detailed **JIRA board** is already set up, with:

- **Epics and Tickets**: Covering all tasks such as Setup & Initialization, API Integration, Map Features, and Styling.
- **Story Points**: Not yet estimated but story points only matter if we decide to do a sprint.
- **Sprint Planning**: If we decide this is the correct way to go. Or else we just have a simple kanban board.
