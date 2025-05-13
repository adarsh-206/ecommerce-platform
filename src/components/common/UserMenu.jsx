import { useState } from "react";
import Link from "next/link";

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const isLoggedIn = false; // Replace with your auth logic

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center text-gray-500 hover:text-gray-900 focus:outline-none"
      >
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            {isLoggedIn ? (
              <>
                <Link
                  href="/account"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  My Account
                </Link>
                <Link
                  href="/orders"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Orders
                </Link>
                <Link
                  href="/wishlist"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Wishlist
                </Link>
                <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Create Account
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
