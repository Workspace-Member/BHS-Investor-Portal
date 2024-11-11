// src/components/Signup.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "../utils/axiosInstance";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    address: "",
    DOB: "",
    userType: "Individual",
  });

  const [validationErrors, setValidationErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Form validation rules
  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 7) {
      errors.password = "Password must be at least 7 characters long";
    }

    if (!formData.address.trim()) {
      errors.address = "Address is required";
    }

    if (!formData.DOB) {
      errors.DOB = "Date of Birth is required";
    } else {
      const dob = new Date(formData.DOB);
      const today = new Date();
      const age = today.getFullYear() - dob.getFullYear();
      if (age < 18) {
        errors.DOB = "You must be at least 18 years old";
      }
    }

    return errors;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear validation error for the field being changed
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("/users/register", formData);
      const { tempToken, userId, message } = response.data;

      // Store necessary data in localStorage
      localStorage.setItem("tempToken", tempToken);
      localStorage.setItem("userId", userId);

      // Show success message
      toast.success(
        message || "Registration successful! Please verify your OTP."
      );

      // Navigate to OTP verification
      navigate("/verify-otp");
    } catch (err) {
      const errorMessage =
        err.response?.data?.error || "Registration failed. Please try again.";
      toast.error(errorMessage);

      // Handle specific error cases
      if (err.response?.status === 400) {
        if (err.response.data.error.includes("email")) {
          setValidationErrors((prev) => ({
            ...prev,
            email: "This email is already registered",
          }));
        }
        if (err.response.data.error.includes("phone")) {
          setValidationErrors((prev) => ({
            ...prev,
            phone: "This phone number is already registered",
          }));
        }
      }
    } finally {
      setLoading(false);
    }
  };

  // Input field component for reusability
  const InputField = ({
    label,
    name,
    type,
    value,
    onChange,
    error,
    ...props
  }) => (
    <div>
      <label className="block text-white mb-1 pl-1 font-bold">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-2 rounded-xl border-2 ${
          error ? "border-red-500" : "border-[#FF9321]"
        } bg-white text-gray-800 focus:outline-none focus:border-[#FF9321] transition duration-200`}
        {...props}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );

  return (
    <div className="bg-[#322323] min-h-screen flex items-center justify-center p-4">
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
            src="/logo_bhavya.png"
            alt="Bhavya Haulage Services Logo"
            className="w-48 h-48 object-contain"
          />
        </div>

        {/* Right Section: Signup Form */}
        <div className="w-full md:w-3/5 md:pl-8">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-[#392929] p-8 rounded-2xl shadow-lg w-full"
          >
            <h3 className="text-2xl font-bold mb-6 text-center text-white">
              Investor's Signup
            </h3>

            <form className="space-y-4" onSubmit={handleSignupSubmit}>
              <InputField
                label="Name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                error={validationErrors.name}
                placeholder="Enter your full name"
                required
              />

              <div>
                <label className="block text-white mb-1 pl-1 font-bold">
                  User Type
                </label>
                <select
                  name="userType"
                  value={formData.userType}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-xl border-2 border-[#FF9321] bg-white text-gray-800 focus:outline-none focus:border-[#FF9321] transition duration-200"
                  required
                >
                  <option value="Individual">Individual</option>
                  <option value="Company">Company</option>
                </select>
              </div>

              <InputField
                label="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
                required
              />

              <InputField
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={validationErrors.email}
                placeholder="Enter your email address"
                required
              />

              <InputField
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                error={validationErrors.password}
                placeholder="Enter password (min. 7 characters)"
                required
                minLength={7}
              />

              <InputField
                label="Address"
                name="address"
                type="text"
                value={formData.address}
                onChange={handleChange}
                error={validationErrors.address}
                placeholder="Enter your full address"
                required
              />

              <InputField
                label="Date of Birth"
                name="DOB"
                type="date"
                value={formData.DOB}
                onChange={handleChange}
                error={validationErrors.DOB}
                required
                max={
                  new Date(
                    new Date().setFullYear(new Date().getFullYear() - 18)
                  )
                    .toISOString()
                    .split("T")[0]
                }
              />

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full bg-[#FF9321] hover:bg-[#e6811e] text-white text-lg py-2 rounded-xl transition duration-300 mt-6 disabled:opacity-50"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin h-5 w-5 mr-3"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Registering...
                  </span>
                ) : (
                  "Register ➤"
                )}
              </motion.button>
            </form>

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
    </div>
  );
};

export default Signup;
