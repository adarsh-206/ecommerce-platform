"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Package,
  ShoppingCart,
  Settings,
  LogOut,
  Menu,
  Bell,
  Search,
  Home,
} from "lucide-react";
import BrandLogo from "../common/BrandLogo";

export const metadata = {
  title: "Chaka-Chak | Clean, Quirky, Totally You",
  description:
    "Shop Chaka-Chak for bold fashion, eye-catching accessories, and stylish decor — made just for you. Unique finds, fast shipping, and good vibes only.",
  icons: {
    icon: "/chaka-chak-logo.ico",
  },
};

export const SellerLayout = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/seller/login");
    } else {
      setIsLoggedIn(true);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/seller/login");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const navItems = [
    { name: "Dashboard", href: "/seller/dashboard", icon: Home },
    { name: "Products", href: "/seller/products", icon: Package },
    { name: "Orders", href: "/seller/orders", icon: ShoppingCart },
    // { name: "Settings", href: "/seller/settings", icon: Settings },
  ];

  if (!isLoggedIn) {
    return null;
  }

  const token = localStorage.getItem("token");

  return (
    <div className="flex h-screen bg-gray-100">
      <div
        className={`${
          isSidebarOpen ? "w-64" : "w-20"
        } bg-gradient-to-r from-amber-50 via-orange-50 to-rose-50 text-amber-800 transition-all duration-300 ease-in-out relative`}
      >
        <div className="flex items-center justify-between p-4 border-b border-amber-200">
          <h1 className={`font-bold text-xl ${!isSidebarOpen && "hidden"}`}>
            {token ? (
              <BrandLogo href="/seller/dashboard" />
            ) : (
              <BrandLogo href="/seller/login" />
            )}
          </h1>
          <button
            onClick={toggleSidebar}
            className="p-1 rounded-md hover:bg-amber-100"
          >
            <Menu size={24} />
          </button>
        </div>
        <nav className="mt-6">
          <ul>
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`
                    flex items-center p-4 hover:bg-amber-100 ${
                      router.pathname === item.href ? "bg-amber-100" : ""
                    }
                  `}
                >
                  <item.icon size={20} />
                  <span className={`ml-4 ${!isSidebarOpen && "hidden"}`}>
                    {item.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="absolute bottom-0 w-full">
          <button
            onClick={handleLogout}
            className={`
              w-full flex items-center p-4 hover:bg-amber-100 cursor-pointer ${
                !isSidebarOpen ? "justify-center" : ""
              }
            `}
          >
            <LogOut size={20} />
            <span className={`ml-4 ${!isSidebarOpen && "hidden"}`}>Logout</span>
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-gradient-to-r from-rose-50 via-orange-50 to-rose-50 z-10 border-b border-amber-200">
          <div className="px-4 py-3 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                  <Search size={18} color="gray" />
                </span>
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 text-gray-500 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="relative p-2 rounded-full hover:bg-gray-100">
                <Bell size={20} color="gray" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center">
                <img
                  src="https://t3.ftcdn.net/jpg/03/62/56/24/360_F_362562495_Gau0POzcwR8JCfQuikVUTqzMFTo78vkF.jpg"
                  alt="seller"
                  className="w-8 h-8 rounded-full border-2 border-amber-500"
                />
                <span className="ml-2 font-medium text-black"></span>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
};

export default SellerLayout;
