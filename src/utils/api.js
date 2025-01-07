export const getApiUrl = (path) => {
  // Logging untuk debugging
  const baseUrl = import.meta.env.VITE_API_URL || "https://api.izinsakit.site";
  console.log("Using API URL:", baseUrl);

  return `${baseUrl}${path}`;
};
