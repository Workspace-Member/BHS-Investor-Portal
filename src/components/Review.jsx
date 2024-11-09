// src/components/Review.jsx

import React from "react";
import { CheckCircle } from "lucide-react";

const Review = ({ investorName = "Valued Investor" }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-600 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white bg-opacity-20 backdrop-blur-lg shadow-2xl rounded-3xl overflow-hidden border border-white border-opacity-30 transition-all duration-500 hover:shadow-3xl hover:scale-105">
        <div className="p-10 text-center">
          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-20 w-20 bg-gradient-to-r from-green-400 to-blue-500 rounded-full opacity-75 animate-pulse"></div>
            </div>
            <CheckCircle className="relative mx-auto h-16 w-16 text-white" />
          </div>
          <h1 className="text-4xl font-extrabold text-white mb-4 tracking-wide">
            Welcome, {investorName}!
          </h1>
          <p className="text-xl text-blue-100 mb-8">
            Thank you for joining our exclusive investment platform.
          </p>
          <div className="bg-white bg-opacity-25 rounded-xl p-6 backdrop-blur-sm">
            <p className="text-sm text-white leading-relaxed">
              Our expert team is carefully reviewing your profile to ensure the
              best investment experience. We'll reach out to you shortly to
              guide you through the next steps of your financial journey.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
