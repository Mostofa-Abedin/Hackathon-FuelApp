import { useState } from "react";
// Importing React's useState hook for managing local state within this custom hook.

import axios from "axios"; 
// Importing Axios to handle HTTP requests. It's a promise-based library that's pretty convenient.

export function useApiRequest() {
  // State to store the response data from the API.
  const [response, setResponse] = useState(null);

  // State to indicate whether the API request is in progress.
  const [loading, setLoading] = useState(false);

  // State to handle any errors encountered during the API call.
  const [error, setError] = useState(null);

  /**
   * Function to send an API request with dynamic parameters.
   * @param {Object} config - Configuration object containing URL, method, headers, body, and token.
   * @param {string} config.url - The endpoint URL for the API request.
   * @param {string} config.method - The HTTP method (e.g., GET, POST, PUT, DELETE).
   * @param {Object} [config.headers] - Custom headers for the request.
   * @param {Object} [config.body] - The request body (optional, for methods like POST).
   * @param {string} [config.token] - Optional bearer token for authentication.
   */
  const sendRequest = async ({ url, method, headers = {}, body = null, token }) => {
    setLoading(true); // Set loading to true to indicate the request has started.
    setError(null); // Clear any previous errors.

    try {
      const config = {
        method, // Use the provided HTTP method.
        url, // Use the provided URL.
        headers: {
          ...headers, // Merge any custom headers provided.
          ...(token && { Authorization: `Bearer ${token}` }), // Include Authorization header if a token is provided.
        },
        ...(body && { data: body }), // Attach the body if provided.
      };

      // Send the API request using Axios and wait for the response.
      const res = await axios(config);
      
      const { data } = res; // Extract the data from the response object.
      setResponse(data); // Save the response data to state.
    } catch (err) {
      setError(err.message || "Error Encountered"); 
      // Save the error message to state, or a default message if one isn't available.
    } finally {
      setLoading(false); 
      // Set loading to false to indicate the request has completed (successfully or not).
    }
  };

  // Return the current state variables and the function to trigger an API request.
  return { response, loading, error, sendRequest };
}
