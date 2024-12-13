import { useState, useEffect } from "react";
// Importing React's useState and useEffect hooks to manage state and lifecycle events.

export function useGeolocation() {
  // State to store the user's location as an object with latitude and longitude.
  const [Location, setLocation] = useState(null);

  // State to store any error messages related to geolocation.
  const [Error, setError] = useState(null);

  useEffect(() => {
    // Check if the browser supports the Geolocation API.
    if (navigator.geolocation) {
      // Try to get the user's current position.
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // On success, update the Location state with latitude and longitude.
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (err) => {
          // On error, update the Error state with an appropriate message.
          setError(`Error: ${err.message}`);
        }
      );
    } else {
      // If Geolocation is not supported, set an appropriate error message.
      setError("Geolocation is not supported by this browser.");
    }
  }, []); // The empty dependency array ensures this runs only once when the component mounts.

  // Returning both Location and Error so that components using this hook can access them.
  return { Location, Error };
}
