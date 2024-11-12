// src/api/axios.js

import axios from "axios";
import { toast } from "react-toastify";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "https://api-bhs.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include the auth token in headers if it exists
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle global errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle specific status codes if needed
    if (error.response && error.response.status === 401) {
      // Handle unauthorized access, possibly redirect to login
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      window.location.href = "/login";
      toast.error("Session expired. Please log in again.");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
