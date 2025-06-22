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
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow mt-10">
      <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          className="w-full border p-2 mb-4"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          type="submit"
        >
          Send Reset Link
        </button>
      </form>
      {message && <p className="text-green-600 mt-4">{message}</p>}
      {error && <p className="text-red-600 mt-4">{error}</p>}
    </div>
  );
}
