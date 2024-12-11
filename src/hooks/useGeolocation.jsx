import { useState, useEffect } from "react";

export function useGeolocation() {
  const [Location, setLocation] = useState(null); // State to store the user's location
  const [Error, setError] = useState(null); // State to store error messages

  // Use `useEffect` to handle side effects like fetching geolocation
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (err) => {
          setError(`Error: ${err.message}`);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }, []); // Empty dependency array ensures this runs only once on mount

  return { Location, Error };
}
