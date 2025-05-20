"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import CartIcon from "./CartIcon";
import UserMenu from "./UserMenu";
import MobileMenu from "./MobileMenu";
import { ShoppingBag, Search, X, Menu, ChevronDown } from "lucide-react";
import apiService from "@/app/utils/apiService";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userDetails, setUserDetails] = useState({});

  const getUserDetails = async () => {
    try {
      const response = await apiService.get("/user-details", true);
      setUserDetails(response.data);
    } catch (error) {
      console.error(
        "Error fetching user details:",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        await getUserDetails();
      } catch (err) {
        console.error("Failed to fetch user details:", err);
      }
    };

    fetchUser();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isLoggedIn = userDetails && Object.keys(userDetails).length > 0;

  return (
    <header
      className={`bg-white sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "shadow-md py-2" : "py-4"
      }`}
    >
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo Area */}
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 mr-8">
              <span className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
                Chaka-Chak
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-1">
              <div className="group relative inline-block">
                <Link
                  href="/categories/clothing"
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50 rounded-md transition-colors duration-200"
                >
                  Clothing
                  <ChevronDown size={16} className="ml-1" />
                </Link>
                <div className="absolute left-0 mt-1 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform">
                  <div className="bg-white rounded-lg shadow-lg ring-1 ring-indigo-300 ring-opacity-5 overflow-hidden">
                    <div className="p-2">
                      <Link
                        href="/categories/clothing/men"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                      >
                        Men's Clothing
                      </Link>
                      <Link
                        href="/categories/clothing/women"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                      >
                        Women's Clothing
                      </Link>
                      <Link
                        href="/categories/clothing/kids"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                      >
                        Kids' Clothing
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <Link
                href="/categories/accessories"
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50 rounded-md transition-colors duration-200"
              >
                Accessories
              </Link>

              <Link
                href="/categories/headware"
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50 rounded-md transition-colors duration-200"
              >
                Headware
              </Link>

              <Link
                href="/categories/pet-products"
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50 rounded-md transition-colors duration-200"
              >
                Pet Products
              </Link>

              <Link
                href="/categories/home-living"
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50 rounded-md transition-colors duration-200"
              >
                Home & Living
              </Link>
            </nav>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {searchOpen ? (
              <div className="relative transition-all duration-300 w-64">
                <SearchBar />
                <button
                  onClick={() => setSearchOpen(false)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X size={18} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                className="text-gray-600 hover:text-indigo-600 transition-colors duration-200"
              >
                <Search size={20} />
              </button>
            )}

            <CartIcon count={3} />

            <UserMenu
              userDetails={userDetails}
              getUserDetails={getUserDetails}
            />

            {!userDetails?.id && (
              <Link
                href="/seller/register"
                className="ml-4 inline-flex items-center px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-medium rounded-lg shadow hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
              >
                <span>Start Selling</span>
                <ShoppingBag className="h-4 w-4 ml-2" />
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <CartIcon count={3} />

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              aria-expanded={mobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <X size={24} aria-hidden="true" />
              ) : (
                <Menu size={24} aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {mobileMenuOpen && (
        <MobileMenu
          setMobileMenuOpen={setMobileMenuOpen}
          userDetails={userDetails}
          getUserDetails={getUserDetails}
        />
      )}
    </header>
  );
}
