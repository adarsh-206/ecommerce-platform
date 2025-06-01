"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import SearchBar from "./SearchBar";

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
        <Link
          href="/categories/clothing"
          className="block p-3 text-amber-800 hover:bg-amber-100/60 hover:text-orange-700 rounded-lg font-medium transition-all duration-200"
        >
          Clothing
        </Link>
        <Link
          href="/categories/accessories"
          className="block p-3 text-amber-800 hover:bg-amber-100/60 hover:text-orange-700 rounded-lg font-medium transition-all duration-200"
        >
          Accessories
        </Link>
        <Link
          href="/categories/headware"
          className="block p-3 text-amber-800 hover:bg-amber-100/60 hover:text-orange-700 rounded-lg font-medium transition-all duration-200"
        >
          Headware
        </Link>
        <Link
          href="/categories/pet-products"
          className="block p-3 text-amber-800 hover:bg-amber-100/60 hover:text-orange-700 rounded-lg font-medium transition-all duration-200"
        >
          Pet Products
        </Link>
        <Link
          href="/categories/home-living"
          className="block p-3 text-amber-800 hover:bg-amber-100/60 hover:text-orange-700 rounded-lg font-medium transition-all duration-200"
        >
          Home & Living
        </Link>

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
            <Link
              href="/seller/register"
              className="block p-3 bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 text-white rounded-lg text-center font-bold shadow-lg hover:from-amber-700 hover:via-orange-700 hover:to-rose-700 transition-all duration-200 transform hover:scale-105"
            >
              Start Selling
            </Link>
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
              href="/account"
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
