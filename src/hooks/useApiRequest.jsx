import { useState } from "react";
import axios from "axios"; // Import axios for HTTP requests

/**
 * Custom hook to send API requests with fully dynamic parameters.
 * @returns {Object} - Contains API response, loading state, error, and a function to trigger requests.
 */
export function useApiRequest() {
  const [response, setResponse] = useState(null); // State to store API response
  const [loading, setLoading] = useState(false); // State to indicate if request is in progress
  const [error, setError] = useState(null); // State to store errors

  /**
   * Function to send an API request with dynamic parameters.
   * @param {Object} config - Configuration object containing URL, method, headers, body, and token.
   * @param {string} config.url - The endpoint URL for the API request.
   * @param {string} config.method - The HTTP method (e.g., GET, POST, PUT, DELETE).
   * @param {Object} [config.headers] - Dynamic headers for the request.
   * @param {Object} [config.body] - The body of the request (for methods like POST or PUT).
   * @param {string} config.token - The token to include in the Authorization header.
   */
  const sendRequest = async ({ url, method, headers = {}, body = null, token }) => {
    setLoading(true); // Start loading
    setError(null); // Reset errors
    try {
      const config = {
        method, // HTTP method (GET, POST, etc.)
        url, // API endpoint URL
        headers: {
          ...headers, // Merge custom headers
          ...(token && { Authorization: `Bearer ${token}` }), // Include token if provided
        },
        ...(body && { data: body }), // Include body only if provided
      };

      // Send the API request using axios
      const res = await axios(config);
      const { data } = res; // Extract the `data` field from the response
      setResponse(data); // Save the response data in state
    } catch (err) {
      setError(err.message || "Error Encountered"); // Save error message in state
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Return the state variables and the request function
  return { response, loading, error, sendRequest };
}
