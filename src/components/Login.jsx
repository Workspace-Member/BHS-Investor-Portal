// src/components/Login.jsx

import React, { useState, useContext } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import OtpVerification from "./OtpVerification";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [step, setStep] = useState(1); // 1: Login Form, 2: OTP Verification
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [tempToken, setTempToken] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const backendUrl = "https://api-bhs.onrender.com"; // Backend URL

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle Login Form Submission
  // const handleLoginSubmit = async (e) => {
  //   e.preventDefault();
  //   setError("");
  //   setLoading(true);
  //   try {
  //     const response = await axios.post(`${backendUrl}/users/login`, formData);
  //     const { tempToken: fetchedTempToken, userId, message } = response.data;

  //     if (message) {
  //       setError(message);
  //       setLoading(false);
  //       return;
  //     }

  //     setTempToken(fetchedTempToken);
  //     setStep(2); // Proceed to OTP Verification step
  //   } catch (err) {
  //     setError(
  //       err.response?.data?.error || "Login failed. Please try again later."
  //     );
  //   } finally {
  //     setLoading(false);
  //   }
  // };


  const handleLoginSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setLoading(true);
  try {
    const response = await axios.post(`${backendUrl}/users/login`, formData);
    const { tempToken: fetchedTempToken, userId, error } = response.data;

    if (error) {
      setError(error);
      return;
    }

    setTempToken(fetchedTempToken);
    setStep(2); // Proceed to OTP Verification step
  } catch (err) {
    const errorMessage =
      err.response?.data?.error ||
      err.response?.data?.message ||
      err.message ||
      "Login failed. Please try again later.";
    setError(errorMessage);
  } finally {
    setLoading(false);
  }
};

  // // Handle OTP Verification
  // const handleOtpVerify = async (otp) => {
  //   setError("");
  //   setLoading(true);
  //   try {
  //     const response = await axios.post(
  //       `${backendUrl}/users/login-verify-otp`,
  //       { otp },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${tempToken}`,
  //         },
  //       }
  //     );

  //     const { token, user, message } = response.data;

  //     if (message) {
  //       setError(message);
  //       setLoading(false);
  //       return;
  //     }

  //     // Log the user in
  //     login(token, user);
  //     navigate("/dashboard");
  //   } catch (err) {
  //     setError(
  //       err.response?.data?.error ||
  //         "OTP verification failed. Please try again."
  //     );
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleOtpVerify = async (otp) => {
    setError("");
    setLoading(true);
    try {
      const response = await axios.post(
        `${backendUrl}/users/login-verify-otp`,
        { otp },
        {
          headers: {
            Authorization: `Bearer ${tempToken}`,
          },
        }
      );
      console.log(response)
      const { token, user, error } = response.data;
      console.log("response", response)
      console.log("token", token)
      console.log("user", user)
      console.log("error", error)
  
      if (error) {
        setError(error);
        return;
      }
      // Log the user in
      login(token, user);
      navigate("/dashboard");
    } catch (err) {
      const errorMessage =
        err.response?.data?.error ||
        err.response?.data?.message ||
        err.message ||
        "OTP verification failed. Please try again.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  

  // Handle Resending OTP
  const handleResendOtp = async () => {
    setError("");
    setLoading(true);
    try {
      const response = await axios.post(
        `${backendUrl}/users/resend-otp`,
        {},
        {
          headers: {
            Authorization: `Bearer ${tempToken}`,
          },
        }
      );
      alert("OTP has been resent to your email/phone.");
    } catch (err) {
      setError("Failed to resend OTP. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-2 py-4 lg:px-8 md:px-8 lg:py-8 md:py-8 bg-[#322323]">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-[#493939] shadow-2xl rounded-3xl p-8 w-full max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center"
      >
        {/* Left Section */}
        <div className="w-full md:w-1/2 mb-8 md:mb-0 flex flex-col items-center justify-center">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white">Welcome to</h1>
          </div>
          <img
            src="logo_bhavya.png"
            alt="Bhavya Haulage Services Logo"
            className="w-48 h-48 object-contain"
          />
          <h2 className="text-3xl font-semibold text-[#FF9321] mt-4">
            Bhavya Haulage Services
          </h2>
        </div>

        {/* Right Section: Login Form or OTP Verification */}
        <div className="w-full md:w-1/2 md:pl-8 flex justify-center">
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-[#392929] p-8 rounded-2xl shadow-lg w-full max-w-md"
            >
              <h3 className="text-2xl font-bold mb-6 text-center text-white">
                Investor's Login
              </h3>
              {error && <p className="text-red-500 mb-4">{error}</p>}
              <form className="space-y-4" onSubmit={handleLoginSubmit}>
                {/* Email Field */}
                <div>
                  <label className="block text-white mb-1 pl-1 font-bold">
                    Email ID
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-xl border-2 border-white bg-white focus:outline-none focus:border-[#FF9321] transition duration-200"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                {/* Password Field */}
                <div>
                  <label className="block text-white mb-1 pl-1 font-bold">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-xl border-2 border-white bg-white focus:outline-none focus:border-[#FF9321] transition duration-200"
                    placeholder="Enter your password"
                    required
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="w-full bg-[#FF9321] text-white text-lg py-2 rounded-xl hover:bg-[#e6821e] transition duration-300 mt-6"
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Login"}
                </motion.button>
              </form>

              {/* Footer Link */}
              <div className="text-center mt-6">
                <p className="text-gray-400">
                  Don't have an account?{" "}
                  <a
                    href="/signup"
                    className="text-[#FF9321] hover:underline font-medium"
                  >
                    Sign up here
                  </a>
                </p>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <OtpVerification
              onVerify={handleOtpVerify}
              onResend={handleResendOtp}
              error={error}
              loading={loading}
            />
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
