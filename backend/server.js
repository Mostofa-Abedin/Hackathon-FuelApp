import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = 4000;

app.use(cors());

let accessToken = null;
let tokenExpiry = null;

app.post("/api/token", async (req, res) => {
  const now = Date.now();

  if (accessToken && tokenExpiry && now < tokenExpiry) {
    return res.json({ access_token: accessToken });
  }

  try {
    const authHeader = process.env.AUTH_HEADER;
    const apiKey = process.env.API_KEY;

    if (!authHeader || !apiKey) {
      throw new Error("AUTH_HEADER or API_KEY missing in .env");
    }

    const response = await fetch(
      "https://api.onegov.nsw.gov.au/oauth/client_credential/accesstoken?grant_type=client_credentials",
      {
        method: "POST",
        headers: {
          Authorization: authHeader,
          "x-api-key": apiKey,
          "Content-Type": "application/x-www-form-urlencoded", // ✅ this was missing
        },
      }
    );

    const text = await response.text();
    console.log("NSW API Raw Response:", text);

    if (!response.ok) {
      throw new Error(`NSW API Error: ${response.status}`);
    }

    const data = JSON.parse(text);
    accessToken = data.access_token;
    tokenExpiry = now + data.expires_in * 1000;

    return res.json({ access_token: accessToken });
  } catch (error) {
    console.error("❌ Error fetching token:", error.message);
    return res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Backend server running at http://localhost:${PORT}`);
});
