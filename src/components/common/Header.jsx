"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import CartIcon from "./CartIcon";
import UserMenu from "./UserMenu";
import MobileMenu from "./MobileMenu";
import { ShoppingBag, Search, X, Menu, ChevronDown } from "lucide-react";
import apiService from "@/app/utils/apiService";
import BrandLogo from "./BrandLogo";

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

  return (
    <header
      className={`bg-gradient-to-r from-amber-50 via-orange-50 to-rose-50 sticky top-0 z-50 transition-all duration-300 border-b border-amber-200/50 ${
        scrolled ? "shadow-lg py-2 backdrop-blur-sm bg-opacity-95" : "py-4"
      }`}
    >
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo Area */}
          <div className="flex items-center">
            <BrandLogo />

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-1">
              <div className="group relative inline-block">
                <Link
                  href="/categories/clothing"
                  className="inline-flex items-center px-4 py-2.5 text-sm font-semibold text-amber-800 hover:text-orange-700 hover:bg-amber-100/60 rounded-lg transition-all duration-200 transform hover:scale-105"
                >
                  Clothing
                  <ChevronDown size={16} className="ml-1" />
                </Link>
                <div className="absolute left-0 mt-1 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                  <div className="bg-gradient-to-br from-white to-amber-50 rounded-xl shadow-xl ring-1 ring-amber-200 ring-opacity-50 overflow-hidden backdrop-blur-sm">
                    <div className="p-3">
                      <Link
                        href="/categories/clothing/men"
                        className="block px-4 py-3 text-sm font-medium text-amber-800 hover:bg-amber-100/70 hover:text-orange-700 rounded-lg transition-all duration-200"
                      >
                        Men's Clothing
                      </Link>
                      <Link
                        href="/categories/clothing/women"
                        className="block px-4 py-3 text-sm font-medium text-amber-800 hover:bg-amber-100/70 hover:text-orange-700 rounded-lg transition-all duration-200"
                      >
                        Women's Clothing
                      </Link>
                      <Link
                        href="/categories/clothing/kids"
                        className="block px-4 py-3 text-sm font-medium text-amber-800 hover:bg-amber-100/70 hover:text-orange-700 rounded-lg transition-all duration-200"
                      >
                        Kids' Clothing
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <Link
                href="/categories/accessories"
                className="px-4 py-2.5 text-sm font-semibold text-amber-800 hover:text-orange-700 hover:bg-amber-100/60 rounded-lg transition-all duration-200 transform hover:scale-105"
              >
                Accessories
              </Link>

              <Link
                href="/categories/headware"
                className="px-4 py-2.5 text-sm font-semibold text-amber-800 hover:text-orange-700 hover:bg-amber-100/60 rounded-lg transition-all duration-200 transform hover:scale-105"
              >
                Headware
              </Link>

              <Link
                href="/categories/pet-products"
                className="px-4 py-2.5 text-sm font-semibold text-amber-800 hover:text-orange-700 hover:bg-amber-100/60 rounded-lg transition-all duration-200 transform hover:scale-105"
              >
                Pet Products
              </Link>

              <Link
                href="/categories/home-living"
                className="px-4 py-2.5 text-sm font-semibold text-amber-800 hover:text-orange-700 hover:bg-amber-100/60 rounded-lg transition-all duration-200 transform hover:scale-105"
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
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-amber-600 hover:text-orange-700 transition-colors duration-200"
                >
                  <X size={18} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2.5 text-amber-700 hover:text-orange-700 hover:bg-amber-100/60 rounded-lg transition-all duration-200 transform hover:scale-105"
              >
                <Search size={20} />
              </button>
            )}

            <div className="p-1">
              <CartIcon count={3} />
            </div>

            <UserMenu
              userDetails={userDetails}
              getUserDetails={getUserDetails}
            />

            {!userDetails?.id && (
              <Link
                href="/seller/register"
                className="ml-4 inline-flex items-center px-4 py-2 bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 text-white text-sm font-bold rounded-xl shadow-lg hover:from-amber-700 hover:via-orange-700 hover:to-rose-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl border border-amber-500/20"
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
              className="inline-flex items-center justify-center p-2.5 rounded-lg text-amber-700 hover:text-orange-700 hover:bg-amber-100/60 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-amber-500 transition-all duration-200"
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
