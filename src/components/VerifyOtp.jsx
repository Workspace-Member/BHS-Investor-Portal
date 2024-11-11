// src/components/VerifyOtp.jsx
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import axios from "../utils/axiosInstance";

const VerifyOtp = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef([]);

  // Get tempToken from localStorage
  const tempToken = localStorage.getItem("tempToken");

  // Check for tempToken and redirect if not found
  useEffect(() => {
    if (!tempToken) {
      toast.error("Please sign up first");
      navigate("/signup");
    }
  }, [tempToken, navigate]);

  // Handle resend timer
  useEffect(() => {
    let interval;
    if (resendTimer > 0 && !canResend) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }

    return () => clearInterval(interval);
  }, [resendTimer, canResend]);

  // Handle OTP input change
  const handleOtpChange = (index, value) => {
    // Only allow digits
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Handle backspace key
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        // If current input is empty, move to previous input
        const newOtp = [...otp];
        newOtp[index - 1] = "";
        setOtp(newOtp);
        inputRefs.current[index - 1].focus();
      } else {
        // Clear current input
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1].focus();
    } else if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Handle paste functionality
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = [...otp];
    pastedData.split("").forEach((char, index) => {
      if (index < 6) newOtp[index] = char;
    });
    setOtp(newOtp);
  };

  // Handle OTP submission
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    const otpString = otp.join("");

    if (otpString.length !== 6) {
      toast.error("Please enter a complete 6-digit OTP");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "/users/verify-otp",
        { otp: otpString },
        {
          headers: {
            Authorization: `Bearer ${tempToken}`,
          },
        }
      );

      toast.success(response.data.message);
      // Clear temporary storage
      localStorage.removeItem("tempToken");
      localStorage.removeItem("userId");
      // Navigate to pending verification page
      navigate("/review");
    } catch (err) {
      const errorMessage =
        err.response?.data?.error || "OTP verification failed";
      toast.error(errorMessage);

      // If account was deleted due to multiple failures, redirect to signup
      if (errorMessage.includes("deleted")) {
        setTimeout(() => {
          navigate("/signup");
        }, 2000);
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle OTP resend
  const handleResendOtp = async () => {
    if (!canResend) return;

    setLoading(true);
    try {
      const response = await axios.post(
        "/users/resend-otp",
        {},
        {
          headers: {
            Authorization: `Bearer ${tempToken}`,
          },
        }
      );

      toast.success(response.data.message || "OTP has been resent");
      setResendTimer(30);
      setCanResend(false);
      setOtp(["", "", "", "", "", ""]);
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to resend OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#322323] min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-[#493939] shadow-2xl rounded-3xl p-8 w-full max-w-md mx-auto"
      >
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white mb-2">
            OTP Verification
          </h1>
          <p className="text-gray-300">
            Enter the 6-digit code sent to your email/phone
          </p>
        </div>

        <form onSubmit={handleOtpSubmit} className="space-y-6">
          {/* OTP Input Section */}
          <div className="flex justify-center space-x-3">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                className="w-12 h-12 text-center text-xl font-bold rounded-lg border-2 border-[#FF9321] bg-white text-gray-800 focus:outline-none focus:border-[#FF9321] focus:ring-2 focus:ring-[#FF9321] transition duration-200"
                required
              />
            ))}
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-[#FF9321] hover:bg-[#e6811e] text-white text-lg py-3 rounded-xl transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
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
                Verifying...
              </span>
            ) : (
              "Verify OTP"
            )}
          </motion.button>
        </form>

        {/* Resend OTP Section */}
        <div className="text-center mt-6">
          <button
            onClick={handleResendOtp}
            disabled={!canResend || loading}
            className={`text-[#FF9321] hover:underline font-medium ${
              !canResend || loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {canResend ? (
              "Resend OTP"
            ) : (
              <span>Resend OTP in {resendTimer}s</span>
            )}
          </button>
        </div>

        {/* Back to Signup Link */}
        <div className="text-center mt-4">
          <button
            onClick={() => navigate("/signup")}
            className="text-gray-400 hover:text-gray-300 text-sm"
          >
            ← Back to Signup
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default VerifyOtp;
