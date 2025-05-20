"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { User, LogOut, ShoppingBag, Heart, Settings } from "lucide-react";
import { useRouter } from "next/navigation";

export default function UserMenu({ userDetails, getUserDetails }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const isLoggedIn = userDetails && Object.keys(userDetails).length > 0;

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsOpen(false);
    getUserDetails();
    router.push("/");
  };

  return (
    <div className="relative" ref={menuRef}>
      {isLoggedIn ? (
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="h-10 w-10 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center text-white font-semibold text-sm"
        >
          {userDetails?.fullName?.[0]?.toUpperCase() || "U"}
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-50 hover:bg-indigo-100 text-indigo-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          aria-expanded={isOpen}
          aria-label="User menu"
        >
          <User size={20} />
        </button>
      )}

      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 rounded-lg shadow-lg bg-white ring-1 ring-indigo-300 ring-opacity-50 overflow-hidden z-50 transition-all duration-200 ease-in-out">
          <div className="p-4 border-b border-indigo-50">
            {isLoggedIn ? (
              <div className="flex items-center space-x-3">
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
            ) : (
              <div className="text-center py-2">
                <p className="text-sm font-medium text-gray-900">Welcome!</p>
                <p className="text-xs text-gray-500">
                  Sign in to access your account
                </p>
              </div>
            )}
          </div>

          <div className="py-2">
            {isLoggedIn ? (
              <>
                <Link
                  href="/account"
                  className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-indigo-50 transition-colors duration-150"
                >
                  <User size={18} className="mr-3 text-indigo-500" />
                  <span>My Account</span>
                </Link>
                <Link
                  href="/orders"
                  className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-indigo-50 transition-colors duration-150"
                >
                  <ShoppingBag size={18} className="mr-3 text-indigo-500" />
                  <span>Orders</span>
                </Link>
                <Link
                  href="/wishlist"
                  className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-indigo-50 transition-colors duration-150"
                >
                  <Heart size={18} className="mr-3 text-indigo-500" />
                  <span>Wishlist</span>
                </Link>
                <Link
                  href="/settings"
                  className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-indigo-50 transition-colors duration-150"
                >
                  <Settings size={18} className="mr-3 text-indigo-500" />
                  <span>Settings</span>
                </Link>
                <button
                  className="flex items-center w-full px-4 py-3 text-sm text-indigo-600 hover:bg-indigo-50 transition-colors duration-150"
                  onClick={handleLogout}
                >
                  <LogOut size={18} className="mr-3" />
                  <span>Sign Out</span>
                </button>
              </>
            ) : (
              <div className="px-3 py-2">
                <Link
                  href="/buyer/login"
                  className="block w-full py-2 px-3 mb-2 text-center font-medium text-sm text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-md hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 transform hover:shadow-md"
                >
                  Sign In
                </Link>
                <Link
                  href="/buyer/register"
                  className="block w-full py-2 px-3 text-center font-medium text-sm text-indigo-700 bg-indigo-50 rounded-md hover:bg-indigo-100 transition-colors duration-200"
                >
                  Create Account
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
