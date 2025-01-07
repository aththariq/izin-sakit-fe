const API_URL = import.meta.env.VITE_API_URL;

export const getApiUrl = (path) => {
  const baseUrl = import.meta.env.VITE_API_URL || 'https://api.izinsakit.site';
  return `${baseUrl}${path}`;
};