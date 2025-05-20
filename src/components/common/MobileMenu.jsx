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
    <div className="md:hidden bg-white shadow-md">
      <div className="p-4">
        <SearchBar />
      </div>
      <nav className="px-4 pb-4 space-y-1">
        <Link
          href="/categories/clothing"
          className="block p-2 text-gray-600 hover:bg-gray-50 rounded"
        >
          Clothing
        </Link>
        <Link
          href="/categories/electronics"
          className="block p-2 text-gray-600 hover:bg-gray-50 rounded"
        >
          Electronics
        </Link>
        <Link
          href="/categories/home"
          className="block p-2 text-gray-600 hover:bg-gray-50 rounded"
        >
          Home &amp; Garden
        </Link>
        <Link
          href="/categories/beauty"
          className="block p-2 text-gray-600 hover:bg-gray-50 rounded"
        >
          Beauty
        </Link>

        <hr className="my-2" />

        {!isLoggedIn ? (
          <>
            <Link
              href="/buyer/login"
              className="block p-2 text-gray-600 hover:bg-gray-50 rounded"
            >
              Sign In
            </Link>
            <Link
              href="/buyer/register"
              className="block p-2 text-gray-600 hover:bg-gray-50 rounded"
            >
              Create Account
            </Link>
            <Link
              href="/seller/register"
              className="block p-2 bg-indigo-600 text-white rounded text-center font-medium"
            >
              Start Selling
            </Link>
          </>
        ) : (
          <>
            <div className="flex items-center space-x-3 p-2">
              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
                {userDetails?.fullName?.[0]?.toUpperCase() || "U"}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {userDetails.fullName}
                </p>
                <p className="text-xs text-gray-500">
                  {userDetails.email || userDetails.phone}
                </p>
              </div>
            </div>
            <Link
              href="/account"
              className="block p-2 text-gray-600 hover:bg-gray-50 rounded"
            >
              My Account
            </Link>
            <Link
              href="/orders"
              className="block p-2 text-gray-600 hover:bg-gray-50 rounded"
            >
              My Orders
            </Link>
            <button
              onClick={handleLogout}
              className="w-full text-left p-2 text-red-600 hover:bg-red-50 rounded"
            >
              Sign Out
            </button>
          </>
        )}
      </nav>
    </div>
  );
}
