// AuthContext.js
import React, { createContext, useState, useEffect, useCallback } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [redirectTo, setRedirectTo] = useState(null);

  const login = useCallback((token) => {
    if (token) {
      try {
        localStorage.setItem("token", token);
        console.log("Token successfully saved to localStorage:", token); // Debugging token
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Error storing token:", error);
      }
    }
  }, []);

  const logout = useCallback(() => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("email"); // Tambahkan penghapusan email jika perlu
      setIsAuthenticated(false);
      window.location.href = "/login"; // Arahkan ke halaman login setelah logout
    } catch (error) {
      console.error("Error during logout:", error);
    }
  }, []);

  useEffect(() => {
    const validateToken = () => {
      const token = localStorage.getItem("token");
      if (token) {
        setIsAuthenticated(true);
        console.log("Auth context: Valid token found");
      } else {
        setIsAuthenticated(false);
      }
      setIsLoading(false);
    };

    // Cek jika ada token di URL dan simpan ke localStorage
    const urlSearchParams = new URLSearchParams(window.location.search);
    const token = urlSearchParams.get("token");
    if (token) {
      localStorage.setItem("token", token);
      setIsAuthenticated(true);
      // Redirect setelah login
      window.location.href = redirectTo || "/Dashboard"; // Ganti dengan halaman yang sesuai
    } else {
      validateToken();
    }
  }, [redirectTo]);

  if (isLoading) {
    return <div>Loading...</div>; // Or your loading component
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
