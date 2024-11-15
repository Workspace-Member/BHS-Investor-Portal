// src/components/ProtectedRoute.jsx

import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

/**
 * ProtectedRoute Component
 *
 * This component restricts access to its child components based on the user's authentication status.
 * If the user is authenticated, it renders the child components.
 * Otherwise, it redirects the user to the login page.
 *
 * Usage:
 * <ProtectedRoute>
 *   <Dashboard />
 * </ProtectedRoute>
 */
const ProtectedRoute = ({ children }) => {
  const { token } = useContext(AuthContext);
  const location = useLocation();

  if (!token) {
    // User is not authenticated
    // Redirect to login page and preserve the current location
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // User is authenticated
  return children;
};

export default ProtectedRoute;
