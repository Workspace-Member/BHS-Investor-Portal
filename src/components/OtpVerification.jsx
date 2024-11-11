// src/components/OtpVerification.jsx

import React, { useState } from "react";
import { motion } from "framer-motion";

const OtpVerification = ({ onVerify, onResend, error, loading }) => {
  const [otp, setOtp] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onVerify(otp);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="otp-container bg-[#392929] p-8 rounded-2xl shadow-lg w-full max-w-md"
    >
      <h3 className="text-2xl font-bold mb-6 text-center text-white">
        OTP Verification
      </h3>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-white mb-1 pl-1 font-bold">
            Enter OTP
          </label>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full px-4 py-2 rounded-xl border-2 border-white bg-white focus:outline-none focus:border-[#FF9321] transition duration-200"
            placeholder="Enter the OTP sent to your email/phone"
            required
            pattern="\d{6}" // Assuming OTP is 6 digits
            title="Please enter a 6-digit OTP."
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="w-full bg-[#FF9321] text-white text-lg py-2 rounded-xl hover:bg-[#e6821e] transition duration-300"
          disabled={loading}
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </motion.button>
      </form>
      <div className="text-center mt-4">
        <button
          onClick={onResend}
          className="text-[#FF9321] hover:underline font-medium"
          disabled={loading}
        >
          Resend OTP
        </button>
      </div>
    </motion.div>
  );
};

export default OtpVerification;
