export const getApiUrl = (path) => {
  const baseUrl = import.meta.env.VITE_API_URL || "https://api.izinsakit.site";
  console.log("Using API URL:", baseUrl, "for path:", path);
  return `${baseUrl}${path}`;
};

export const handleAuthToken = (token) => {
  if (!token) return false;
  
  // Ensure token has Bearer prefix
  const authToken = token.startsWith('Bearer ') ? token : `Bearer ${token}`;
  localStorage.setItem('token', authToken);
  return true;
};

export const clearAuthToken = () => {
  localStorage.removeItem('token');
};

// Tambahkan logging saat aplikasi dimulai
console.log("VITE_API_URL:", import.meta.env.VITE_API_URL);
