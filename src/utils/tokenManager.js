let accessToken = null;

/**
 * Fetches a valid access token from your backend server.
 * Caches the token in memory until it expires.
 *
 * @returns {Promise<string|null>} The access token or null if failed.
 */
export const getAccessToken = async () => {
  if (accessToken) return accessToken;

  try {
    const response = await fetch("http://localhost:4000/api/token", {
      method: "POST",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch token");
    }

    const data = await response.json();
    accessToken = data.access_token;
    return accessToken;
  } catch (error) {
    console.error("❌ Error fetching token:", error.message);
    return null;
  }
};
