// Configuration file for API URLs and other environment variables
export const config = {
  // API Configuration
  // Ensure API_BASE_URL always ends with /api
  API_BASE_URL: (() => {
    const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
    return baseUrl.endsWith('/api') ? baseUrl : `${baseUrl}/api`;
  })(),

  // App Configuration
  APP_NAME: "planora",
  APP_URL: "http://localhost:5173",

  // Environment
  NODE_ENV: "development",
};

export default config;
