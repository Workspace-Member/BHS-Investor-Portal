// src/components/VerifyOtp.jsx

import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../utils/axiosInstance"; // Use the centralized axios instance
import { toast } from "react-toastify";

const VerifyOtp = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract tempToken and userId from location state
  const { tempToken, userId } = location.state || {};

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // If tempToken or userId is missing, redirect to signup
  if (!tempToken || !userId) {
    navigate("/signup");
  }

  /**
   * handleOtpChange Function
   *
   * Updates the OTP state as the user types into the input field.
   *
   * @param {Object} event - The event object from the input change
   */
  const handleOtpChange = (event) => {
    setOtp(event.target.value);
  };

  /**
   * handleOtpSubmit Function
   *
   * Handles the submission of the OTP verification form.
   * Sends the OTP along with tempToken and userId to the backend for verification.
   *
   * @param {Object} e - The event object from the form submission
   */
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await axios.post(
        `/users/verify-otp`,
        { otp },
        {
          headers: {
            Authorization: `Bearer ${tempToken}`,
          },
        }
      );

      const { token, user, message } = response.data;

      if (message) {
        // Handle messages if any (e.g., additional verification required)
        alert(message);
        navigate("/signup"); // Or another appropriate page
        setLoading(false);
        return;
      }

      // Assuming you have a login function in AuthContext
      // If not, you can handle token storage here
      // Example:
      // login(token, user);
      toast.success("OTP verified successfully!");
      navigate("/dashboard"); // Redirect to Dashboard after successful verification
    } catch (err) {
      setError(
        err.response?.data?.error || "OTP verification failed. Please try again."
      );
      toast.error(
        err.response?.data?.error || "OTP verification failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  /**
   * handleResendOtp Function
   *
   * Handles the OTP resend functionality.
   */
  const handleResendOtp = async () => {
    setError("");
    setLoading(true);
    try {
      const response = await axios.post(
        `/users/resend-otp`,
        { userId },
        {
          headers: {
            Authorization: `Bearer ${tempToken}`,
          },
        }
      );

      const { message } = response.data;

      if (message) {
        toast.info(message);
      } else {
        toast.info("OTP has been resent to your email/phone.");
      }
    } catch (err) {
      setError("Failed to resend OTP. Please try again later.");
      toast.error("Failed to resend OTP. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#322323] min-h-screen flex items-center justify-center p-4">
      <div className="bg-[#493939] shadow-2xl rounded-3xl p-8 w-full max-w-md mx-auto">
        <h3 className="text-2xl font-bold mb-6 text-center text-white">
          OTP Verification
        </h3>
        <form className="space-y-4" onSubmit={handleOtpSubmit}>
          {/* OTP Field */}
          <div>
            <label className="block text-white mb-1 pl-1 font-bold">
              Enter OTP
            </label>
            <input
              type="text"
              name="otp"
              value={otp}
              onChange={handleOtpChange}
              className="w-full px-4 py-2 rounded-xl border-2 border-[#FF9321] bg-white text-gray-800 focus:outline-none focus:border-[#FF9321] transition duration-200"
              placeholder="Enter the OTP sent to you"
              required
              maxLength={6} // Assuming OTP is 6 digits
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#FF9321] hover:bg-[#e6811e] text-white text-lg py-2 rounded-xl transition duration-300 mt-4"
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>

        {/* Resend OTP Link */}
        <div className="text-center mt-4">
          <button
            onClick={handleResendOtp}
            className="text-[#FF9321] hover:underline font-medium"
            disabled={loading}
          >
            Resend OTP
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="text-red-500 text-center mt-4">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyOtp;
