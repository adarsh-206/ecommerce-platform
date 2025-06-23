"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { ShoppingBag } from "lucide-react";
import apiService from "../../app/utils/apiService";
import { showToast } from "@/utils/showToast";
import BrandLogo from "@/components/common/BrandLogo";

export default function ResetPasswordForm() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      showToast.error("Missing or invalid token");
      return;
    }

    if (password !== confirm) {
      showToast.error("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const data = await apiService.post("/reset-password", {
        token,
        password,
      });
      showToast.success(data.message || "Password reset successfully!");
      setSubmitted(true);
    } catch (err) {
      const errorMessage =
        err?.response?.data?.error ||
        err?.message ||
        "Failed to reset password";
      showToast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <p className="text-rose-600 text-center mt-10 font-semibold">
        Invalid or missing token.
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-amber-50 flex items-center justify-center p-4 relative">
      <div className="absolute top-6 left-6">
        <BrandLogo />
      </div>
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-amber-100">
        <h2 className="text-3xl font-extrabold text-orange-600 text-center mb-6">
          Reset Password
        </h2>

        {submitted ? (
          <div className="text-center">
            <p className="text-green-600 font-medium text-lg mb-6">
              Your password has been reset successfully.
            </p>
            <button
              onClick={() => router.push("/")}
              className="flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-200 mx-auto"
            >
              <ShoppingBag className="w-5 h-5" />
              Continue Shopping
            </button>
          </div>
        ) : (
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
              className="w-full text-gray-500 border border-orange-300 rounded-lg px-4 py-2 mb-6 focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="Confirm new password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
            />

            <button
              type="submit"
              disabled={loading}
              className={`w-full ${
                loading
                  ? "bg-amber-400 cursor-not-allowed"
                  : "bg-amber-600 hover:bg-amber-700"
              } text-white font-semibold py-2 px-4 rounded-lg transition duration-200`}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
