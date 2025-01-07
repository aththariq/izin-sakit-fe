export const getApiUrl = (path) => {
  // Hapus pengecekan env karena kita sudah set VITE_API_URL
  const baseUrl = import.meta.env.VITE_API_URL || "https://api.izinsakit.site";

  // Tambahkan logging untuk debug
  console.log("Using API URL:", baseUrl);

  return `${baseUrl}${path}`;
};
