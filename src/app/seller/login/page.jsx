"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Eye,
  EyeOff,
  LogIn,
  ShoppingBag,
  Mail,
  Phone,
  Lock,
} from "lucide-react";
import { useRouter } from "next/navigation";
import apiService from "@/app/utils/apiService";
import BrandLogo from "@/components/common/BrandLogo";
import Image from "next/image";

export const sellerLoginMetadata = {
  title: "Seller Login | Chaka-Chak - Access Your Business Dashboard",
  description:
    "Access your Chaka-Chak seller dashboard to manage your fashion business, track sales performance, and grow your presence on India's premier marketplace for unique and quirky fashion items. Your seller account provides comprehensive tools and insights that enable you to run your online business efficiently while maximizing your sales potential and customer satisfaction. Through your secure seller login, you gain access to a powerful suite of business management tools including inventory management systems, order processing workflows, customer communication platforms, and detailed analytics that help you understand your business performance and identify growth opportunities. Your dashboard provides real-time updates on new orders, payment processing, shipping requirements, and customer inquiries, ensuring that you never miss important business activities. The platform includes sophisticated inventory tracking that helps you manage stock levels, set up automated reorder alerts, and coordinate with suppliers or manufacturers. You can easily upload new products, update existing listings, manage pricing strategies, and create promotional campaigns that drive sales and increase your brand visibility. Our seller platform also provides access to valuable business insights through comprehensive reporting tools that track your sales trends, customer demographics, popular products, and seasonal patterns. This data helps you make informed decisions about inventory planning, marketing strategies, and business expansion opportunities. Your seller account includes integrated communication tools that enable professional customer service, allowing you to respond to customer inquiries, handle return requests, and build positive relationships that lead to repeat business and positive reviews. The platform also provides educational resources, best practice guides, and seller community forums where you can learn from experienced sellers and stay updated on marketplace trends and opportunities.",
  keywords:
    "chaka chak seller login, seller dashboard, business account, manage store, seller access",
  icons: {
    icon: "/chaka-chak-logo.ico",
    apple: "/chaka-chak-logo.png",
  },
};

export default function SellerLogin() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email_or_phone: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await apiService.post("/login", {
        ...formData,
        role: "seller",
      });

      if (response?.status === 200) {
        router.push("/seller/dashboard");
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userType", "seller");
      }
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.error || "Login failed. Please try again.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-amber-100/20 via-orange-100/20 to-rose-100/20 opacity-30"></div>

      <div className="relative z-10 container mx-auto px-4 py-6">
        <div className="mb-8">
          <BrandLogo href="/" />
        </div>

        <div className="flex items-center justify-center min-h-[calc(100vh-120px)]">
          <div className="w-full max-w-6xl">
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
              <div className="flex flex-col lg:flex-row">
                <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-amber-600 via-orange-600 to-rose-600 p-12 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  <div className="relative z-10 flex flex-col justify-center text-white max-w-md mx-auto">
                    <div className="mb-8">
                      <h2 className="text-4xl font-bold mb-4 leading-tight">
                        Welcome Back,{" "}
                        <span className="text-amber-200">Seller!</span>
                      </h2>
                      <p className="text-xl text-white/90 leading-relaxed">
                        Access your powerful dashboard to manage inventory,
                        track sales, and grow your business with ease.
                      </p>
                    </div>

                    <div className="mt-12 text-center">
                      <div className="w-full mx-auto flex items-center justify-center">
                        <Image
                          src="/seller/seller_login.png"
                          alt="Seller Login Illustration"
                          width={400}
                          height={400}
                          className="object-contain"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-center p-8 lg:p-12 lg:w-1/2">
                  <div className="w-full max-w-md">
                    <div className="text-center mb-10">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl mb-6">
                        <LogIn className="h-8 w-8 text-amber-600" />
                      </div>
                      <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Seller Login
                      </h1>
                      <p className="text-gray-600 text-lg">
                        Sign in to manage your store
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      {error && (
                        <div className="rounded-2xl bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 p-4">
                          <div className="flex items-center">
                            <div className="flex-shrink-0">
                              <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                            </div>
                            <div className="ml-3">
                              <p className="text-sm font-medium text-red-800">
                                {error}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="space-y-2">
                        <label
                          htmlFor="email_or_phone"
                          className="block text-sm font-semibold text-gray-700 mb-2"
                        >
                          Email or Phone
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Mail className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="text"
                            id="email_or_phone"
                            name="email_or_phone"
                            value={formData.email_or_phone}
                            onChange={handleChange}
                            required
                            className="block w-full pl-12 pr-4 py-4 text-gray-900 bg-gray-50/50 border border-gray-200 rounded-2xl placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 hover:bg-gray-50"
                            placeholder="Enter your email or phone number"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label
                          htmlFor="password"
                          className="block text-sm font-semibold text-gray-700 mb-2"
                        >
                          Password
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Lock className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="block w-full pl-12 pr-12 py-4 text-gray-900 bg-gray-50/50 border border-gray-200 rounded-2xl placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 hover:bg-gray-50"
                            placeholder="Enter your password"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-200"
                          >
                            {showPassword ? (
                              <EyeOff className="h-5 w-5" />
                            ) : (
                              <Eye className="h-5 w-5" />
                            )}
                          </button>
                        </div>

                        <div className="text-right mt-3">
                          <Link
                            href="/seller/forgot-password"
                            className="text-sm font-semibold text-amber-600 hover:text-orange-600 transition-colors duration-200"
                          >
                            Forgot password?
                          </Link>
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full flex items-center justify-center px-6 py-4 bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 text-white font-semibold rounded-2xl shadow-lg hover:from-amber-700 hover:via-orange-700 hover:to-rose-700 focus:outline-none focus:ring-4 focus:ring-amber-500/25 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                      >
                        {isLoading ? (
                          <div className="flex items-center">
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3"></div>
                            Signing In...
                          </div>
                        ) : (
                          <>
                            <LogIn className="h-5 w-5 mr-3" />
                            Sign In to Dashboard
                          </>
                        )}
                      </button>

                      {/* <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                          <span className="px-4 bg-white text-gray-500 font-medium">
                            New to selling?
                          </span>
                        </div>
                      </div>

                      <div className="text-center">
                        <p className="text-gray-600 mb-4">
                          Start your journey as a seller today
                        </p>
                        <Link
                          href="/seller/register"
                          className="inline-flex items-center px-6 py-3 border-2 border-amber-600 text-amber-600 font-semibold rounded-2xl hover:bg-amber-600 hover:text-white transition-all duration-300 transform hover:scale-105"
                        >
                          <ShoppingBag className="h-5 w-5 mr-2" />
                          Create Seller Account
                        </Link>
                      </div> */}
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
