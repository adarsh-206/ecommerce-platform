"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShoppingBag } from "lucide-react";
import apiService from "../utils/apiService";
import BrandLogo from "@/components/common/BrandLogo";
import { showToast } from "@/utils/showToast";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await apiService.post("/forgot-password", { email });
      showToast.success(data.message || "Password reset email sent");
      setSubmitted(true);
    } catch (err) {
      const errorMessage =
        err?.response?.data?.error || err?.message || "Something went wrong";
      showToast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-amber-50 flex items-center justify-center p-4 relative">
      <div className="absolute top-6 left-6">
        <BrandLogo />
      </div>
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-amber-100">
        <h2 className="text-3xl font-extrabold text-orange-600 text-center mb-6">
          Forgot Password
        </h2>

        {submitted ? (
          <div className="text-center">
            <p className="text-green-600 font-medium text-lg mb-6">
              Please check your email. We’ve sent you a password reset link.
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
              className={`w-full ${
                loading
                  ? "bg-amber-400 cursor-not-allowed"
                  : "bg-amber-600 hover:bg-amber-700"
              } text-white font-semibold py-2 px-4 rounded-lg transition duration-200`}
              type="submit"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
