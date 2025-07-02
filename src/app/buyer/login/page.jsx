import { Suspense } from "react";
import BrandLogo from "@/components/common/BrandLogo";
import BuyerLoginForm from "./BuyerLoginForm";
import Link from "next/link";

export default function BuyerLoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 relative">
      <div className="absolute top-6 left-6 z-10">
        <BrandLogo href="/" />
      </div>

      <div className="min-h-screen flex items-center justify-center px-6 py-12">
        <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center shadow-2xl rounded-3xl overflow-hidden bg-white">
          <div className="hidden md:flex flex-col items-start justify-center p-12 bg-gradient-to-br from-amber-600 via-orange-600 to-rose-600 text-white h-full space-y-8">
            <h2 className="text-5xl font-extrabold tracking-tight text-white">
              Welcome Back!
            </h2>
            <p className="text-lg leading-relaxed text-white opacity-90">
              Sign in to access your account and continue your premium shopping
              experience.
            </p>
          </div>

          <div className="bg-white p-10 md:p-12 rounded-r-3xl">
            <h1 className="text-4xl font-extrabold text-amber-800 mb-4">
              Sign In
            </h1>
            <p className="text-gray-600 mb-6">
              Welcome back! Please enter your details.
            </p>

            <Suspense
              fallback={
                <p className="text-sm text-gray-500">Loading login form...</p>
              }
            >
              <BuyerLoginForm />
            </Suspense>

            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Don't have an account?{" "}
                <Link
                  href="/buyer/register"
                  className="text-amber-600 font-semibold"
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
