// RequireAuth.js
import React, { useContext, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "@/contexts/AuthContext";

const RequireAuth = ({ children }) => {
  const { isAuthenticated, setRedirectTo } = useContext(AuthContext);
  const location = useLocation();

  // Simpan halaman yang diminta sebelum login
  useEffect(() => {
    if (!isAuthenticated) {
      setRedirectTo(location.pathname);
    }
  }, [isAuthenticated, location.pathname, setRedirectTo]);

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;
