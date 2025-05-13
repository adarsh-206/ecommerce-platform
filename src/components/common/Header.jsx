"use client";

import Link from "next/link";
import { useState } from "react";
import SearchBar from "./SearchBar";
import CartIcon from "./CartIcon";
import UserMenu from "./UserMenu";
import MobileMenu from "./MobileMenu";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <span className="text-2xl font-bold text-indigo-600">
                ShopEase
              </span>
            </Link>
            <nav className="hidden md:ml-10 md:flex md:space-x-8">
              <Link
                href="/categories/clothing"
                className="text-gray-500 hover:text-gray-900"
              >
                Clothing
              </Link>
              <Link
                href="/categories/accessories"
                className="text-gray-500 hover:text-gray-900"
              >
                Accessories
              </Link>
              <Link
                href="/categories/headware"
                className="text-gray-500 hover:text-gray-900"
              >
                Headware
              </Link>
              <Link
                href="/categories/pet-products"
                className="text-gray-500 hover:text-gray-900"
              >
                Pet Products
              </Link>
              <Link
                href="/categories/home-living"
                className="text-gray-500 hover:text-gray-900"
              >
                Home & Living
              </Link>
            </nav>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <SearchBar />
            <CartIcon count={0} />
            <UserMenu />
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-500 hover:text-gray-900 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && <MobileMenu />}
    </header>
  );
}
