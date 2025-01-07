export const getApiUrl = (path) => {
  const env = import.meta.env.VITE_ENV || "development";
  const baseUrl = import.meta.env.VITE_API_URL;

  if (!baseUrl) {
    console.warn("API URL tidak ditemukan di environment variables");
    return env === "production"
      ? `https://api.izinsakit.site${path}`
      : `http://localhost:3000${path}`;
  }

  return `${baseUrl}${path}`;
};

export const getFrontendUrl = () => {
  return import.meta.env.VITE_FRONTEND_URL || "http://localhost:5173";
};
