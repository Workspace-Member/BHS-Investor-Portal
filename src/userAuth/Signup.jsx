import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Download, ArrowLeft } from "lucide-react"; // Import additional icons if needed

const Signup = ({ isUser, setIsUser }) => {
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    password: "",
    address: "",
    DOB: "",
  });

  const backendUrl = "https://bhsxw.onrender.com"; // Backend URL

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleClick = async (event) => {
    event.preventDefault(); // Prevent default form submission
    navigate("/signedup/")

    // try {
    //   const response = await axios.post(`${backendUrl}/users`, formData);
    //   if (response.status === 201) {
    //     alert("User registered successfully. Waiting for admin approval.");
    //     setIsUser(true);
    //     navigate("/review", { replace: true });
    //   }
    // } catch (error) {
    //   if (error.response) {
    //     console.error("Backend returned an error response:", error.response.data);
    //     alert(`Error: ${error.response.data.message || "Failed to register user."}`);
    //   } else if (error.request) {
    //     console.error("No response received:", error.request);
    //     alert("No response received from the server. Please check your network or server.");
    //   } else {
    //     console.error("Error setting up the request:", error.message);
    //     alert(`Error: ${error.message}`);
    //   }
    // }
  };

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
            src="logo_bhavya.png"
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
            className="bg-[#392929] p-8 rounded-2xl shadow-lg"
          >
            <h3 className="text-2xl font-bold mb-6 text-center text-white">
              Investor's Signup
            </h3>
            <form className="space-y-4">
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
                  className="w-full px-4 py-2 rounded-xl border-2 border-[#FF9321] bg-white text-gray-300 focus:outline-none focus:border-[#FF9321] transition duration-200"
                  placeholder="Enter your name"
                  required
                />
              </div>

              {/* Phone Number Field */}
              <div>
                <label className="block text-white mb-1 pl-1 font-bold">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-xl border-2 border-[#FF9321] bg-white text-gray-300 focus:outline-none focus:border-[#FF9321] transition duration-200"
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
                  className="w-full px-4 py-2 rounded-xl border-2 border-[#FF9321] bg-white text-gray-300 focus:outline-none focus:border-[#FF9321] transition duration-200"
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
                  className="w-full px-4 py-2 rounded-xl border-2 border-[#FF9321] bg-white text-gray-300 focus:outline-none focus:border-[#FF9321] transition duration-200"
                  placeholder="Enter your password"
                  required
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
                  className="w-full px-4 py-2 rounded-xl border-2 border-[#FF9321] bg-white text-gray-300 focus:outline-none focus:border-[#FF9321] transition duration-200"
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
                  className="w-full px-4 py-2 rounded-xl border-2 border-[#FF9321] bg-white text-gray-300 focus:outline-none focus:border-[#FF9321] transition duration-200"
                  required
                />
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full bg-[#FF9321] hover:bg-[#e6811e] text-white text-lg py-2 rounded-xl transition duration-300 mt-6"
                onClick={handleClick}
              >
                Register ➤
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
    </div>
  );
};

export default Signup;
