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
    const validateAuth = async () => {
      try {
        // Get token from URL or localStorage
        const params = new URLSearchParams(window.location.search);
        const urlToken = params.get("token");
        const storedToken = localStorage.getItem("token");
        
        if (urlToken) {
          // Save new token from URL
          console.log("Found token in URL", urlToken);
          const authToken = `Bearer ${urlToken}`;
          localStorage.setItem("token", authToken);
          setIsAuthenticated(true);
          
          // Clean URL
          window.history.replaceState({}, document.title, "/dashboard");
        } else if (storedToken) {
          // Use existing token
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Auth validation error:", error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    validateAuth();
  }, []);

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
