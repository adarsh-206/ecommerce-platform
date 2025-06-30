"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import CartIcon from "./CartIcon";
import UserMenu from "./UserMenu";
import MobileMenu from "./MobileMenu";
import { Search, X, Menu, Shirt } from "lucide-react";
import apiService from "@/app/utils/apiService";
import BrandLogo from "./BrandLogo";
import categories from "@/constants/categories";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import "./style.css";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const pathname = usePathname();
  const { cartItems } = useCart();

  const cartCount = cartItems?.length;

  const getUserDetails = async () => {
    try {
      const response = await apiService.get("/user-details", {}, true);
      setUserDetails(response.data);
    } catch (error) {
      if (error.response?.status === 401) {
        return;
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
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
          <div className="flex items-center">
            <BrandLogo href="/" />
            <nav className="hidden lg:flex space-x-1">
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={cat.slug}
                  className="inline-flex items-center px-4 py-2.5 text-sm font-semibold text-amber-800 hover:text-orange-700 hover:bg-amber-100/60 rounded-lg transition-all duration-200 transform hover:scale-105"
                >
                  {cat.name}
                </Link>
              ))}
            </nav>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {searchOpen ? (
              <div className="relative transition-all duration-300 min-w-80">
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
              <CartIcon count={cartCount || 0} />
            </div>

            <UserMenu
              userDetails={userDetails}
              getUserDetails={getUserDetails}
            />
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
          </div>

          <div className="md:hidden flex items-center space-x-4">
            <CartIcon count={cartCount || 0} />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2.5 rounded-lg text-amber-700 hover:text-orange-700 hover:bg-amber-100/60 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-amber-500 transition-all duration-200"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

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
