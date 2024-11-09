// src/App.jsx

import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Signedup from "./components/Signedup";
import Review from "./components/Review";
import Profile from "./components/Profile";
import Assets from "./components/Assets";
import Contract from "./components/Contract";
import Asset from "./components/Asset";
import Investment from "./components/Investment";
import Investments from "./components/Investments";
import Trips from "./components/Trips";
import Dashboard from "./components/Dashboard";
//import ContactForm from "./components/ContactForm";
import GuidePage from "./components/Guide";
import NavBar from "./components/NavBar";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <NavBar />
        <div className="w-full h-full bg-[#EBEBEB]">
          <Routes>
            {/* Home Route - Redirect to Dashboard if authenticated, else to Login */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            {/* Login Route */}
            <Route path="/login" element={<Login />} />

            {/* Signup Route */}
            <Route path="/signup" element={<Signup />} />

            {/* Signed Up Confirmation Route */}
            <Route path="/signedup" element={<Signedup />} />

            {/* Dashboard Route */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            {/* Profile Route */}
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />

            {/* Assets Routes */}
            <Route
              path="/assets"
              element={
                <ProtectedRoute>
                  <Assets />
                </ProtectedRoute>
              }
            />
            <Route
              path="/asset/:id"
              element={
                <ProtectedRoute>
                  <Asset />
                </ProtectedRoute>
              }
            />

            {/* Investment Routes */}
            <Route
              path="/investments"
              element={
                <ProtectedRoute>
                  <Investments />
                </ProtectedRoute>
              }
            />
            <Route
              path="/investment/:id"
              element={
                <ProtectedRoute>
                  <Investment />
                </ProtectedRoute>
              }
            />

            {/* Trips Routes */}
            <Route
              path="/trips"
              element={
                <ProtectedRoute>
                  <Trips />
                </ProtectedRoute>
              }
            />

            {/* Contract Route */}
            <Route
              path="/contract"
              element={
                <ProtectedRoute>
                  <Contract />
                </ProtectedRoute>
              }
            />

            {/* Contact Form Route */}
            {/* <Route
              path="/contact"
              element={
                <ProtectedRoute>
                  <ContactForm />
                </ProtectedRoute>
              }
            /> */}

            {/* Guide Page Route */}
            <Route
              path="/guide"
              element={
                <ProtectedRoute>
                  <GuidePage />
                </ProtectedRoute>
              }
            />

            {/* Review Route */}
            <Route
              path="/review"
              element={
                <ProtectedRoute>
                  <Review />
                </ProtectedRoute>
              }
            />

            {/* Catch-All Route - Redirect to Home */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
