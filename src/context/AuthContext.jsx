// src/context/AuthContext.jsx

import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// Create the Auth Context
export const AuthContext = createContext();

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(
    localStorage.getItem("authToken") || null
  );
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  useEffect(() => {
    if (authToken) {
      localStorage.setItem("authToken", authToken);
      axios.defaults.headers.common["Authorization"] = `Bearer ${authToken}`;
    } else {
      localStorage.removeItem("authToken");
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [authToken]);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const login = (token, userData) => {
    setAuthToken(token);
    setUser(userData);
  };

  const logout = () => {
    setAuthToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ authToken, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
