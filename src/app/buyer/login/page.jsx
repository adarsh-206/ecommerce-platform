"use client";
import { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import apiService from "@/app/utils/apiService";
import BrandLogo from "@/components/common/BrandLogo";
import { useAuth } from "@/context/AuthContext";

export const buyerLoginMetadata = {
  title: "Login | Chaka-Chak - Access Your Fashion Account",
  description:
    "Access your Chaka-Chak account to continue your personalized shopping journey and enjoy all the exclusive benefits that come with being a valued member of our fashion-forward community. Our secure login process protects your account information while providing quick and easy access to your personal dashboard, saved items, order history, and customized shopping experience. Once logged in, you'll have immediate access to your wishlist items, saved addresses and payment methods, ongoing order tracking, and personalized product recommendations tailored specifically to your style preferences and shopping behavior. Your account dashboard serves as your central hub for managing all aspects of your Chaka-Chak experience, from updating your profile information to accessing exclusive member-only deals and promotions. We understand the importance of account security, which is why we've implemented robust security measures including secure password requirements, optional two-factor authentication, and advanced encryption protocols to protect your personal and financial information. If you're having trouble accessing your account, our password recovery system makes it easy to regain access through your registered email address. For returning customers, logging in provides seamless access to your complete purchase history, making it simple to reorder favorite items, track current shipments, or manage returns and exchanges. Your login also enables you to participate in our loyalty program, earn rewards points on purchases, and access special member pricing on select items. We've designed our login process to be as smooth and hassle-free as possible, ensuring that you can quickly access your account and get back to discovering amazing new fashion finds that express your unique style and personality.",
  keywords:
    "chaka chak login, sign in, access account, member login, user access",
  icons: {
    icon: "/chaka-chak-logo.ico",
    apple: "/chaka-chak-logo.png",
  },
};

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
  const { login } = useAuth();

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
        // localStorage.setItem("token", response.data.token);
        login(response.data.token);
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
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 relative">
      <div className="absolute top-6 left-6 z-10">
        <BrandLogo href="/" />
      </div>

      <div className="min-h-screen flex items-center justify-center px-6 py-12">
        <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center shadow-2xl rounded-3xl overflow-hidden bg-white">
          <div className="hidden md:flex flex-col items-start justify-center p-12 bg-gradient-to-br from-amber-600 via-orange-600 to-rose-600 text-white h-full">
            <div className="space-y-8">
              <h2 className="text-5xl font-extrabold tracking-tight text-white">
                Welcome Back!
              </h2>
              <p className="text-lg leading-relaxed text-white opacity-90">
                Sign in to access your account and continue your premium
                shopping experience.
              </p>
              <div className="space-y-6 mt-12">
                <div className="flex items-center space-x-4 p-4 rounded-xl">
                  <div className="h-12 w-12 rounded-full flex items-center justify-center border border-white">
                    <span className="text-xl font-bold text-white">1</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-white">
                      Access Your Orders
                    </h3>
                    <p className="text-sm text-white">
                      Track shipments and view order history
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 rounded-xl">
                  <div className="h-12 w-12 rounded-full flex items-center justify-center border border-white">
                    <span className="text-xl font-bold text-white">2</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-white">
                      Exclusive Offers
                    </h3>
                    <p className="text-sm text-white">
                      Get personalized deals and recommendations
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 rounded-xl">
                  <div className="h-12 w-12 rounded-full flex items-center justify-center border border-white">
                    <span className="text-xl font-bold text-white">3</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-white">
                      Faster Checkout
                    </h3>
                    <p className="text-sm text-white">
                      Save your details for quick purchases
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-10 md:p-12 rounded-r-3xl">
            <div className="mb-8">
              <h1 className="text-4xl font-extrabold text-amber-800 mb-2 tracking-wide">
                Sign In
              </h1>
              <p className="text-gray-600 text-lg">
                Welcome back! Please enter your details
              </p>
            </div>

            {loginError && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{loginError}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="email_or_phone"
                  className="block text-sm font-semibold text-amber-800 mb-2"
                >
                  Email or Phone Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-amber-600" />
                  </div>
                  <input
                    type="text"
                    id="email_or_phone"
                    name="email_or_phone"
                    value={form.email_or_phone}
                    onChange={handleChange}
                    className={`block w-full pl-10 pr-3 py-3 border ${
                      errors.email_or_phone
                        ? "border-red-300"
                        : "border-amber-200"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-900 placeholder-gray-500`}
                    placeholder="Enter your email or phone number"
                  />
                </div>
                {errors.email_or_phone && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.email_or_phone}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-amber-800 mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-amber-600" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    className={`block w-full pl-10 pr-10 py-3 border ${
                      errors.password ? "border-red-300" : "border-amber-200"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-900 placeholder-gray-500`}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-amber-600 hover:text-orange-700"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-2 text-sm text-red-600">{errors.password}</p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-amber-300 rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    Remember me
                  </label>
                </div>
                <Link
                  href="/forgot-password"
                  className="text-sm font-semibold text-amber-600 hover:text-orange-700 transition-colors duration-200"
                >
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 hover:from-amber-700 hover:via-orange-700 hover:to-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Don't have an account?{" "}
                <Link
                  href="/buyer/register"
                  className="font-semibold text-amber-600 hover:text-orange-700 transition-colors duration-200"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
