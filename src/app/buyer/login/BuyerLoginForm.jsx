"use client";

import { useEffect, useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import apiService from "@/app/utils/apiService";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useSearchParams, useRouter } from "next/navigation";

export default function BuyerLoginForm() {
  const [form, setForm] = useState({ email_or_phone: "", password: "" });
  const [errors, setErrors] = useState({ email_or_phone: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  const { login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "/";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (errors[name]) setErrors({ ...errors, [name]: "" });
    if (loginError) setLoginError("");
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    if (!form.email_or_phone.trim()) {
      newErrors.email_or_phone = "Email or phone number is required";
      isValid = false;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^[0-9]{10,15}$/;
      if (
        !emailRegex.test(form.email_or_phone) &&
        !phoneRegex.test(form.email_or_phone)
      ) {
        newErrors.email_or_phone = "Please enter a valid email or phone number";
        isValid = false;
      }
    }

    if (!form.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setLoginError("");

    try {
      const response = await apiService.post("/login", {
        ...form,
        role: "buyer",
      });

      if (response.data?.token) {
        login(response.data.token);

        rememberMe
          ? localStorage.setItem("rememberedUser", form.email_or_phone)
          : localStorage.removeItem("rememberedUser");

        router.push(redirectPath);
      } else {
        setLoginError("Login failed. Please check your credentials.");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "An error occurred during login. Please try again.";
      setLoginError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-semibold text-amber-800 mb-2">
          Email or Phone Number
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-3.5 h-5 w-5 text-amber-600" />
          <input
            name="email_or_phone"
            value={form.email_or_phone}
            onChange={handleChange}
            placeholder="Enter your email or phone number"
            className={`pl-10 pr-3 py-3 w-full border ${
              errors.email_or_phone ? "border-red-300" : "border-amber-200"
            } rounded-lg focus:ring-amber-500 focus:ring-2`}
          />
        </div>
        {errors.email_or_phone && (
          <p className="mt-1 text-sm text-red-600">{errors.email_or_phone}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-semibold text-amber-800 mb-2">
          Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-3.5 h-5 w-5 text-amber-600" />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className={`pl-10 pr-10 py-3 w-full border ${
              errors.password ? "border-red-300" : "border-amber-200"
            } rounded-lg focus:ring-amber-500 focus:ring-2`}
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-3.5 text-amber-600"
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>
        {errors.password && (
          <p className="mt-1 text-sm text-red-600">{errors.password}</p>
        )}
      </div>

      {loginError && (
        <div className="text-sm text-red-600 bg-red-50 p-2 rounded-lg">
          {loginError}
        </div>
      )}

      <div className="flex justify-end">
        <Link href="/forgot-password" className="text-sm text-amber-600">
          Forgot password?
        </Link>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 rounded-lg transition"
      >
        {isLoading ? "Signing in..." : "Sign In"}
      </button>
    </form>
  );
}
