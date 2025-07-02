"use client";
import { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import apiService from "@/app/utils/apiService";
import BrandLogo from "@/components/common/BrandLogo";
import { useAuth } from "@/context/AuthContext";

export default function SuperAdminLogin() {
  const [form, setForm] = useState({ email_or_phone: "", password: "" });
  const [errors, setErrors] = useState({ email_or_phone: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const { login } = useAuth();
  const router = useRouter();

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
      newErrors.email_or_phone = "Email or phone is required";
      isValid = false;
    }
    if (!form.password || form.password.length < 6) {
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
        role: "super-admin",
      });
      if (response.data?.token) {
        login(response.data.token);
        localStorage.setItem("userType", "super-admin");
        router.push("/super-admin/dashboard");
      } else {
        setLoginError("Invalid credentials");
      }
    } catch (error) {
      const message =
        error.response?.data?.message || "Login failed. Try again.";
      setLoginError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 flex items-center justify-center px-6">
      <div className="absolute top-6 left-6">
        <BrandLogo href="/" />
      </div>
      <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-xl">
        <h1 className="text-3xl font-extrabold text-amber-800 mb-4">
          Super Admin Login
        </h1>
        <p className="text-gray-600 mb-6 text-sm">
          Enter your credentials to access the dashboard
        </p>
        {loginError && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
            {loginError}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-amber-800 mb-2">
              Email or Phone
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-amber-600" />
              <input
                type="text"
                name="email_or_phone"
                value={form.email_or_phone}
                onChange={handleChange}
                className={`w-full text-gray-600 pl-10 pr-3 py-3 rounded-lg border ${
                  errors.email_or_phone ? "border-red-300" : "border-amber-200"
                } focus:outline-none focus:ring-2 focus:ring-amber-500`}
                placeholder="Enter email or phone"
              />
            </div>
            {errors.email_or_phone && (
              <p className="text-sm text-red-600 mt-1">
                {errors.email_or_phone}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold text-amber-800 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-amber-600" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                className={`w-full text-gray-600 pl-10 pr-10 py-3 rounded-lg border ${
                  errors.password ? "border-red-300" : "border-amber-200"
                } focus:outline-none focus:ring-2 focus:ring-amber-500`}
                placeholder="Enter password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-amber-600"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-sm text-red-600 mt-1">{errors.password}</p>
            )}
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-lg text-white font-semibold bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 hover:from-amber-700 hover:to-rose-700 transition duration-300"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
