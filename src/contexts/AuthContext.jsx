import React, { createContext, useState, useEffect, useCallback } from "react";
import { handleAuthToken, clearAuthToken } from "@/utils/api";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const login = useCallback((token) => {
    if (token) {
      try {
        if (handleAuthToken(token)) {
          setIsAuthenticated(true);
          console.log("Authentication successful");
        }
      } catch (error) {
        console.error("Login error:", error);
      }
    }
  }, []);

  const logout = useCallback(() => {
    clearAuthToken();
    setIsAuthenticated(false);
    window.location.href = "/login";
  }, []);

  useEffect(() => {
    const validateAuth = () => {
      const token = localStorage.getItem("token");
      if (token) {
        setIsAuthenticated(true);
        console.log("Auth context: Valid token found");
      } else {
        setIsAuthenticated(false);
      }
      setIsLoading(false);
    };

    validateAuth();
  }, []);

  // Check URL parameters for token
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    if (token) {
      login(token);
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [login]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
