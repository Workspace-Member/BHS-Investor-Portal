// src/components/Signup.jsx

import React, { useState, useContext } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axiosInstance"; // Use the centralized axios instance
import Signedup from "./Signedup"; // Ensure Signedup component is correctly imported
import { AuthContext } from "../context/AuthContext";

const Signup = () => {
  const [step, setStep] = useState(1); // 1: Signup Form, 2: Success
  const [formData, setFormData] = useState({
    name: "",
    phone: "", // Changed from phoneNumber to phone
    email: "",
    password: "",
    address: "",
    DOB: "",
    userType: "Individual", // Ensured alignment with backend
  });
  const [tempToken, setTempToken] = useState("");
  const [userId, setUserId] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // Optional: To log the user in immediately after signup

  /**
   * handleChange Function
   *
   * Updates the formData state as the user types into the form fields.
   *
   * @param {Object} event - The event object from the input change
   */
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  /**
   * handleSignupSubmit Function
   *
   * Handles the submission of the signup form.
   * Sends the formData to the backend to create a new user.
   *
   * @param {Object} e - The event object from the form submission
   */
  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await axios.post(`/users/register`, formData);
      const { tempToken: receivedTempToken, userId: receivedUserId, message } = response.data;

      if (message) {
        // Handle messages if any (e.g., registration successful but pending verification)
        alert(message);
        setStep(3);
        setLoading(false);
        return;
      }

      setTempToken(receivedTempToken);
      setUserId(receivedUserId);

      // Navigate to the OTP Verification page, passing tempToken and userId via state
      navigate("/verify-otp", {
        state: { tempToken: receivedTempToken, userId: receivedUserId },
      });
    } catch (err) {
      setError(
        err.response?.data?.error || "Registration failed. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  /**
   * handleProceed Function
   *
   * Navigates the user to the login page after successful signup.
   */
  const handleProceed = () => {
    navigate("/login");
  };

  return (
    <div className="bg-[#322323] min-h-screen flex items-center justify-center p-4">
      {/* Step 1: Signup Form */}
      {step === 1 && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-[#493939] shadow-2xl rounded-3xl p-8 w-full max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center"
        >
          {/* Left Section */}
          <div className="w-full md:w-2/5 mb-8 md:mb-0 flex flex-col items-center justify-center">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-white">Welcome to</h1>
              <h2 className="text-3xl font-semibold text-[#FF9321]">
                Bhavya Haulage Services
              </h2>
            </div>
            <img
              src="/logo_bhavya.png" // Ensure the image path is correct
              alt="Bhavya Haulage Services Logo"
              className="w-48 h-48 object-contain"
            />
          </div>

          {/* Right Section: Signup Form */}
          <div className="w-full md:w-3/5 md:pl-8 flex justify-center">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-[#392929] p-8 rounded-2xl shadow-lg w-full max-w-md"
            >
              <h3 className="text-2xl font-bold mb-6 text-center text-white">
                Investor's Signup
              </h3>
              <form className="space-y-4" onSubmit={handleSignupSubmit}>
                {/* Name Field */}
                <div>
                  <label className="block text-white mb-1 pl-1 font-bold">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-xl border-2 border-[#FF9321] bg-white text-gray-800 focus:outline-none focus:border-[#FF9321] transition duration-200"
                    placeholder="Enter your name"
                    required
                  />
                </div>

                {/* User Type Field */}
                <div>
                  <label className="block text-white mb-1 pl-1 font-bold">
                    User Type
                  </label>
                  <select
                    name="userType" // Changed from 'type' to 'userType'
                    value={formData.userType}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-xl border-2 border-[#FF9321] bg-white text-gray-800 focus:outline-none focus:border-[#FF9321] transition duration-200"
                    required
                  >
                    <option value="Individual">Individual</option>
                    <option value="Company">Company</option>
                  </select>
                </div>

                {/* Phone Field */}
                <div>
                  <label className="block text-white mb-1 pl-1 font-bold">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-xl border-2 border-[#FF9321] bg-white text-gray-800 focus:outline-none focus:border-[#FF9321] transition duration-200"
                    placeholder="Enter your phone number"
                    required
                  />
                </div>

                {/* Email ID Field */}
                <div>
                  <label className="block text-white mb-1 pl-1 font-bold">
                    Email ID
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-xl border-2 border-[#FF9321] bg-white text-gray-800 focus:outline-none focus:border-[#FF9321] transition duration-200"
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
                    className="w-full px-4 py-2 rounded-xl border-2 border-[#FF9321] bg-white text-gray-800 focus:outline-none focus:border-[#FF9321] transition duration-200"
                    placeholder="Enter your password"
                    required
                    minLength={7}
                  />
                </div>

                {/* Address Field */}
                <div>
                  <label className="block text-white mb-1 pl-1 font-bold">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-xl border-2 border-[#FF9321] bg-white text-gray-800 focus:outline-none focus:border-[#FF9321] transition duration-200"
                    placeholder="Enter your address"
                    required
                  />
                </div>

                {/* DOB Field */}
                <div>
                  <label className="block text-white mb-1 pl-1 font-bold">
                    DOB
                  </label>
                  <input
                    type="date"
                    name="DOB"
                    value={formData.DOB}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-xl border-2 border-[#FF9321] bg-white text-gray-800 focus:outline-none focus:border-[#FF9321] transition duration-200"
                    required
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="w-full bg-[#FF9321] hover:bg-[#e6811e] text-white text-lg py-2 rounded-xl transition duration-300 mt-6"
                  disabled={loading}
                >
                  {loading ? "Registering..." : "Register ➤"}
                </motion.button>
              </form>

              {/* Footer Link */}
              <div className="text-center mt-6">
                <p className="text-gray-300">
                  Already have an account?{" "}
                  <a
                    href="/login"
                    className="text-[#FF9321] hover:underline font-medium"
                  >
                    Login here
                  </a>
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* Step 3: Success Confirmation */}
      {step === 3 && <Signedup handleProceed={handleProceed} />}
    </div>
  );
};

export default Signup;
