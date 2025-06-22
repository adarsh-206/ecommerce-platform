"use client";

import { useState } from "react";
import apiService from "../utils/apiService";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const data = await apiService.post("/forgot-password", { email });
      setMessage(data.message || "Password reset email sent");
    } catch (err) {
      const errorMessage =
        err?.response?.data?.error || err?.message || "Something went wrong";
      setError(errorMessage);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-amber-100">
        <h2 className="text-3xl font-extrabold text-orange-600 text-center mb-6">
          Forgot Password
        </h2>
        <form onSubmit={handleSubmit}>
          <label className="block text-amber-700 font-medium mb-1">
            Email Address
          </label>
          <input
            type="email"
            className="w-full text-gray-500 border border-orange-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-orange-400"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button
            className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
            type="submit"
          >
            Send Reset Link
          </button>
        </form>

        {message && (
          <p className="text-green-600 text-center mt-4 font-medium">
            {message}
          </p>
        )}
        {error && (
          <p className="text-rose-600 text-center mt-4 font-medium">{error}</p>
        )}
      </div>
    </div>
  );
}
