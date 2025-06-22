"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import apiService from "../utils/apiService";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!token) {
      setError("Missing or invalid token");
      return;
    }

    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }

    try {
      const data = await apiService.post("/reset-password", {
        token,
        password,
      });
      setMessage(data.message || "Password reset successfully!");
      setTimeout(() => router.push("/buyer/login"), 3000);
    } catch (err) {
      const errorMessage =
        err?.response?.data?.error ||
        err?.message ||
        "Failed to reset password";
      setError(errorMessage);
    }
  };

  if (!token)
    return (
      <p className="text-rose-600 text-center mt-10 font-semibold">
        Invalid or missing token.
      </p>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-100 to-rose-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-amber-100">
        <h2 className="text-3xl font-extrabold text-orange-600 text-center mb-6">
          Reset Password
        </h2>
        <form onSubmit={handleSubmit}>
          <label className="block text-amber-700 font-medium mb-1">
            New Password
          </label>
          <input
            type="password"
            className="w-full text-gray-500 border border-orange-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-orange-400"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <label className="block text-amber-700 font-medium mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            className="w-full text-gray-500 border border-orange-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-orange-400"
            placeholder="Confirm new password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
          />

          <button
            className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
            type="submit"
          >
            Reset Password
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
