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
          className="h-10 w-10 rounded-full bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 flex items-center justify-center text-white font-bold text-sm shadow-md cursor-pointer hover:shadow-lg transition-all duration-200 transform hover:scale-105"
        >
          {userDetails?.fullName?.[0]?.toUpperCase() || "U"}
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-center h-10 w-10 rounded-full bg-amber-100/60 hover:bg-amber-100 text-amber-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500 transform hover:scale-105"
          aria-expanded={isOpen}
          aria-label="User menu"
        >
          <User size={20} />
        </button>
      )}

      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 rounded-xl shadow-xl bg-gradient-to-br from-white to-amber-50 ring-1 ring-amber-200 ring-opacity-50 overflow-hidden z-50 transition-all duration-200 ease-in-out backdrop-blur-sm">
          <div className="p-4 border-b border-amber-200/30">
            {isLoggedIn ? (
              <div className="flex items-center space-x-3">
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
            ) : (
              <div className="text-center py-2">
                <p className="text-sm font-semibold text-amber-900">Welcome!</p>
                <p className="text-xs text-amber-700">
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
                  className="flex items-center px-4 py-3 text-sm text-amber-800 hover:bg-amber-100/60 hover:text-orange-700 transition-all duration-200 rounded-lg mx-2"
                >
                  <User size={18} className="mr-3 text-amber-600" />
                  <span>My Account</span>
                </Link>
                <Link
                  href="/orders"
                  className="flex items-center px-4 py-3 text-sm text-amber-800 hover:bg-amber-100/60 hover:text-orange-700 transition-all duration-200 rounded-lg mx-2"
                >
                  <ShoppingBag size={18} className="mr-3 text-amber-600" />
                  <span>Orders</span>
                </Link>
                <Link
                  href="/wishlist"
                  className="flex items-center px-4 py-3 text-sm text-amber-800 hover:bg-amber-100/60 hover:text-orange-700 transition-all duration-200 rounded-lg mx-2"
                >
                  <Heart size={18} className="mr-3 text-amber-600" />
                  <span>Wishlist</span>
                </Link>
                <Link
                  href="/settings"
                  className="flex items-center px-4 py-3 text-sm text-amber-800 hover:bg-amber-100/60 hover:text-orange-700 transition-all duration-200 rounded-lg mx-2"
                >
                  <Settings size={18} className="mr-3 text-amber-600" />
                  <span>Settings</span>
                </Link>
                <button
                  className="flex items-center w-full px-4 py-3 text-sm text-amber-700 hover:bg-amber-100/60 hover:text-orange-700 transition-all duration-200 rounded-lg mx-2"
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
                  className="block w-full py-3 px-4 mb-2 text-center font-bold text-sm text-white bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 rounded-lg hover:from-amber-700 hover:via-orange-700 hover:to-rose-700 transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
                >
                  Sign In
                </Link>
                <Link
                  href="/buyer/register"
                  className="block w-full py-3 px-4 text-center font-semibold text-sm text-amber-700 bg-amber-100/60 rounded-lg hover:bg-amber-100 transition-all duration-200"
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
