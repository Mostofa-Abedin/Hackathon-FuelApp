import React, { createContext, useState } from "react";

// Create StationContext
export const StationContext = createContext();

// StationProvider Component
export const StationProvider = ({ children }) => {
  const [stations, setStations] = useState([]); // State to store station data

  return (
    <StationContext.Provider value={{ stations, setStations }}>
      {children}
    </StationContext.Provider>
  );
};
