"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import SearchBar from "./SearchBar";
import categories from "@/constants/categories";
import { Sparkles, Shirt } from "lucide-react";

export default function MobileMenu({
  userDetails,
  setMobileMenuOpen,
  getUserDetails,
}) {
  const isLoggedIn = userDetails && Object.keys(userDetails).length > 0;
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    getUserDetails();
    router.push("/");
    setMobileMenuOpen(false);
  };

  return (
    <div className="md:hidden bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 shadow-xl border-t border-amber-200/50 backdrop-blur-sm">
      <div className="p-4 border-b border-amber-200/30">
        <SearchBar />
      </div>
      <nav className="px-4 pb-4 space-y-2">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={cat.slug}
            className="block p-3 text-amber-800 hover:bg-amber-100/60 hover:text-orange-700 rounded-lg font-medium transition-all duration-200"
          >
            {cat.name}
          </Link>
        ))}

        <hr className="my-3 border-amber-200/50" />

        {!isLoggedIn ? (
          <>
            <Link
              href="/buyer/login"
              className="block p-3 text-amber-800 hover:bg-amber-100/60 hover:text-orange-700 rounded-lg font-medium transition-all duration-200"
            >
              Sign In
            </Link>
            <Link
              href="/buyer/register"
              className="block p-3 text-amber-800 hover:bg-amber-100/60 hover:text-orange-700 rounded-lg font-medium transition-all duration-200"
            >
              Create Account
            </Link>
            {/* <Link
              href="/seller/register"
              className="block p-3 bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 text-white rounded-lg text-center font-bold shadow-lg hover:from-amber-700 hover:via-orange-700 hover:to-rose-700 transition-all duration-200 transform hover:scale-105"
            >
              Start Selling
            </Link> */}
            <div className="flex justify-center">
              <a
                href="/customize-your-product"
                className="group text-sm relative inline-flex items-center justify-center gap-2 px-4 py-2 w-full sm:w-auto text-lg font-bold text-white rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 shadow-xl transition-transform duration-300 hover:scale-110 focus:outline-none shiny-button"
              >
                <Shirt className="w-3 h-3 text-white transition-transform duration-300 group-hover:rotate-6" />
                Customize Your Apparel
                <span className="absolute inset-0 rounded-xl ring-2 ring-transparent group-hover:ring-white/40 transition duration-300 pointer-events-none" />
              </a>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center space-x-3 p-3 bg-amber-100/40 rounded-lg">
              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
                {userDetails?.fullName?.[0]?.toUpperCase() || "U"}
              </div>
              <div>
                <p className="text-sm font-semibold text-amber-900">
                  {userDetails.fullName}
                </p>
                <p className="text-xs text-amber-700">
                  {userDetails.email || userDetails.phone}
                </p>
              </div>
            </div>
            <Link
              href="/my-account"
              className="block p-3 text-amber-800 hover:bg-amber-100/60 hover:text-orange-700 rounded-lg font-medium transition-all duration-200"
            >
              My Account
            </Link>
            <Link
              href="/orders"
              className="block p-3 text-amber-800 hover:bg-amber-100/60 hover:text-orange-700 rounded-lg font-medium transition-all duration-200"
            >
              My Orders
            </Link>
            <button
              onClick={handleLogout}
              className="w-full text-left p-3 text-red-700 hover:bg-red-100/60 hover:text-red-800 rounded-lg font-medium transition-all duration-200"
            >
              Sign Out
            </button>
          </>
        )}
      </nav>
    </div>
  );
}
