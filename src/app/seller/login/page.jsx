"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { useRouter } from "next/navigation";
import apiService from "@/app/utils/apiService";

export default function SellerLogin() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email_or_phone: "",
    password: "",
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiService.post("/login", formData);
      console.log("response", response.data);

      if (response?.status === 200) {
        console.log("hello from inside");

        localStorage.setItem("token", response.data.token);
        router.push("/seller/dashboard");
      }
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.detail || "Login failed. Please try again.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white">
      <div className="container mx-auto px-4 py-6">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold text-indigo-600">Chaka-Chak</span>
        </Link>

        <div className="mt-16 flex flex-col overflow-hidden rounded-xl bg-white shadow-xl lg:flex-row">
          <div className="hidden bg-indigo-600 px-8 py-12 text-white lg:flex lg:w-1/2 lg:flex-col lg:justify-center">
            <div className="max-w-md">
              <h2 className="text-3xl font-bold">Welcome Back, Seller!</h2>
              <p className="mt-4 text-indigo-100">
                Log in to manage your dashboard, inventory, and sales easily.
              </p>
              <div className="mt-6 text-center">
                <img
                  src="/seller/seller_login.png"
                  alt="Seller Dashboard Preview"
                  className="mx-auto object-cover"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center px-8 py-12 lg:w-1/2">
            <div className="w-full max-w-md">
              <div className="text-center">
                <h1 className="text-2xl font-bold text-gray-900">
                  Seller Login
                </h1>
                <p className="mt-2 text-gray-600">
                  Sign in to manage your store
                </p>
              </div>

              <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                {error && (
                  <div className="rounded-md bg-red-100 p-3 text-sm text-red-700">
                    {error}
                  </div>
                )}

                <div>
                  <label
                    htmlFor="email_or_phone"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email or Phone
                  </label>
                  <input
                    type="text"
                    id="email_or_phone"
                    name="email_or_phone"
                    value={formData.email_or_phone}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-2xl border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                    placeholder="Enter phone or email address"
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <div className="relative mt-1">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="block w-full rounded-2xl border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  <div className="mt-2 text-right">
                    <Link
                      href="/seller/forgot-password"
                      className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Forgot password?
                    </Link>
                  </div>
                </div>

                <button
                  type="submit"
                  className="flex w-full items-center justify-center rounded-2xl bg-indigo-600 py-2 px-4 font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <LogIn size={18} className="mr-2" />
                  Sign In
                </button>

                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    Don't have a seller account?{" "}
                    <Link
                      href="/seller/register"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Register now
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
