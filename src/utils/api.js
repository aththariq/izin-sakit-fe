
const API_URL = import.meta.env.VITE_API_URL;

export const getApiUrl = (endpoint) => {
  return `${API_URL}${endpoint}`;
};