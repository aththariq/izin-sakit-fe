export const getApiUrl = (path) => {
  const baseUrl = import.meta.env.VITE_API_URL || "https://api.izinsakit.site";
  console.log("Using API URL:", baseUrl);
  return `${baseUrl}${path}`;
};

// Tambahkan logging saat aplikasi dimulai
console.log("VITE_API_URL:", import.meta.env.VITE_API_URL);
