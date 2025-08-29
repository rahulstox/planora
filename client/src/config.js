// Configuration file for API URLs and other environment variables
export const config = {
  // API Configuration
  // This line now uses the Vercel environment variable for the live site,
  // and falls back to localhost for local development.
  API_BASE_URL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",

  // App Configuration
  APP_NAME: "planora",
  APP_URL: "http://localhost:5173",

  // Environment
  NODE_ENV: "development",
};

export default config;
