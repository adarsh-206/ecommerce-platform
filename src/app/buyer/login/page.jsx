"use client";
import { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import apiService from "@/app/utils/apiService";

export default function BuyerLogin() {
  const [form, setForm] = useState({
    email_or_phone: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email_or_phone: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }

    if (loginError) {
      setLoginError("");
    }
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

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setLoginError("");

    try {
      const response = await apiService.post("/login", {
        ...form,
        role: "buyer",
      });

      if (response.data && response.data.token) {
        localStorage.setItem("token", response.data.token);
        if (rememberMe) {
          localStorage.setItem("rememberedUser", form.email_or_phone);
        } else {
          localStorage.removeItem("rememberedUser");
        }
        window.location.href = "/";
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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center px-6 py-12">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center shadow-2xl rounded-3xl overflow-hidden bg-white">
        <div className="hidden md:flex flex-col items-start justify-center p-12 bg-gradient-to-br from-indigo-600 to-purple-700 text-white h-full">
          <div className="space-y-8">
            <div className="flex items-center space-x-2">
              <Link
                href="/"
                className="text-3xl font-extrabold tracking-tight px-4 py-2 rounded-lg"
              >
                Chaka-Chak
              </Link>
            </div>

            <h2 className="text-5xl font-extrabold tracking-tight mt-8">
              Welcome Back!
            </h2>

            <p className="text-lg leading-relaxed opacity-90">
              Sign in to access your account and continue your premium shopping
              experience.
            </p>

            <div className="space-y-6 mt-12">
              <div className="flex items-center space-x-4 p-4 rounded-xl">
                <div className="h-12 w-12 bg-opacity-20 rounded-full flex items-center justify-center">
                  <span className="text-xl font-bold">1</span>
                </div>
                <div>
                  <h3 className="font-semibold text-xl">Access Your Orders</h3>
                  <p className="opacity-80">
                    Track shipments and view order history
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4">
                <div className="h-12 w-12 rounded-full flex items-center justify-center">
                  <span className="text-xl font-bold">2</span>
                </div>
                <div>
                  <h3 className="font-semibold text-xl">Exclusive Offers</h3>
                  <p className="opacity-80">
                    Get personalized deals and recommendations
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 rounded-xl">
                <div className="h-12 w-12 rounded-full flex items-center justify-center">
                  <span className="text-xl font-bold">3</span>
                </div>
                <div>
                  <h3 className="font-semibold text-xl">Faster Checkout</h3>
                  <p className="opacity-80">
                    Save your details for quick purchases
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-10 md:p-12 rounded-r-3xl">
          <div className="md:hidden flex justify-center mb-8">
            <Link
              href="/"
              className="text-3xl font-extrabold text-indigo-600 tracking-tight"
            >
              Chaka-Chak
            </Link>
          </div>

          <h1 className="text-4xl font-extrabold text-indigo-700 mb-2 tracking-wide">
            Sign In
          </h1>
          <p className="text-gray-500 mb-8">
            Welcome back! Please enter your details
          </p>

          {loginError && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 text-sm">
              {loginError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="text-indigo-400" size={20} />
              </div>
              <input
                type="text"
                name="email_or_phone"
                value={form.email_or_phone}
                onChange={handleChange}
                placeholder="Email or Phone Number"
                className={`w-full text-gray-700 pl-12 pr-4 py-4 rounded-xl border ${
                  errors.email_or_phone ? "border-red-500" : "border-gray-200"
                } placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition`}
              />
              {errors.email_or_phone && (
                <p className="text-red-500 text-xs mt-1 ml-1">
                  {errors.email_or_phone}
                </p>
              )}
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="text-indigo-400" size={20} />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Password"
                className={`w-full text-gray-700 pl-12 pr-12 py-4 rounded-xl border ${
                  errors.password ? "border-red-500" : "border-gray-200"
                } placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition`}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-4 flex items-center"
              >
                {showPassword ? (
                  <EyeOff
                    className="text-gray-400 hover:text-indigo-600"
                    size={20}
                  />
                ) : (
                  <Eye
                    className="text-gray-400 hover:text-indigo-600"
                    size={20}
                  />
                )}
              </button>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1 ml-1">
                  {errors.password}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between py-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Remember me
                </label>
              </div>
              <div>
                <Link
                  href="/buyer/forgot-password"
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-800"
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition shadow-lg flex items-center justify-center space-x-2 text-lg disabled:opacity-70"
              >
                {isLoading ? (
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : null}
                <span>{isLoading ? "Signing in..." : "Sign in"}</span>
              </button>
            </div>

            <div className="relative flex py-5 items-center">
              <div className="flex-grow border-t border-gray-200"></div>
              <span className="flex-shrink mx-4 text-gray-400">or</span>
              <div className="flex-grow border-t border-gray-200"></div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                className="flex items-center justify-center py-3 px-4 border border-gray-300 rounded-xl shadow-sm bg-white hover:bg-gray-50 transition"
              >
                <svg
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10H12V14.26H17.92C17.66 15.63 16.88 16.79 15.71 17.57V20.34H19.28C21.36 18.42 22.56 15.6 22.56 12.25Z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23C14.97 23 17.46 22.02 19.28 20.34L15.71 17.57C14.73 18.23 13.48 18.63 12 18.63C9.13 18.63 6.72 16.75 5.82 14.15H2.16V16.99C3.97 20.55 7.7 23 12 23Z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.82 14.15C5.6 13.52 5.48 12.84 5.48 12.15C5.48 11.46 5.6 10.78 5.82 10.15V7.31H2.16C1.42 8.79 1 10.42 1 12.15C1 13.88 1.42 15.51 2.16 16.99L5.82 14.15Z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.67C13.63 5.67 15.08 6.25 16.21 7.33L19.36 4.18C17.45 2.45 14.97 1.42 12 1.42C7.7 1.42 3.97 3.87 2.16 7.43L5.82 10.27C6.72 7.67 9.13 5.67 12 5.67Z"
                    fill="#EA4335"
                  />
                </svg>
                <span className="text-sm font-medium text-gray-700">
                  Google
                </span>
              </button>

              <button
                type="button"
                className="flex items-center justify-center py-3 px-4 border border-gray-300 rounded-xl shadow-sm bg-white hover:bg-gray-50 transition"
              >
                <svg
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 16.9913 5.65686 21.1283 10.4375 21.8785V14.8906H7.89844V12H10.4375V9.79688C10.4375 7.29063 11.9305 5.90625 14.2146 5.90625C15.3087 5.90625 16.4531 6.10156 16.4531 6.10156V8.5625H15.1921C13.9499 8.5625 13.5625 9.33334 13.5625 10.1242V12H16.3359L15.8926 14.8906H13.5625V21.8785C18.3431 21.1283 22 16.9913 22 12Z"
                    fill="#1877F2"
                  />
                  <path
                    d="M15.8926 14.8906L16.3359 12H13.5625V10.1242C13.5625 9.33334 13.9499 8.5625 15.1921 8.5625H16.4531V6.10156C16.4531 6.10156 15.3087 5.90625 14.2146 5.90625C11.9305 5.90625 10.4375 7.29063 10.4375 9.79688V12H7.89844V14.8906H10.4375V21.8785C10.9523 21.9595 11.4753 22 12 22C12.5247 22 13.0477 21.9595 13.5625 21.8785V14.8906H15.8926Z"
                    fill="white"
                  />
                </svg>
                <span className="text-sm font-medium text-gray-700">
                  Facebook
                </span>
              </button>
            </div>
          </form>

          <div className="text-center text-gray-500 text-sm mt-8">
            Don't have an account?{" "}
            <Link
              href="/buyer/register"
              className="text-indigo-600 font-medium hover:text-indigo-800"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
