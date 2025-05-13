"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Users,
  Package,
  ShoppingCart,
  DollarSign,
  Settings,
  LogOut,
  Menu,
  Bell,
  Search,
  Home,
  Box,
  Truck,
  BarChart2,
  Tag,
  MessageSquare,
} from "lucide-react";

export const AdminLayout = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
    if (!loggedIn) {
      router.push("/admin/login");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    router.push("/admin/login");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const navItems = [
    { name: "Dashboard", href: "/admin/dashboard", icon: Home },
    { name: "Products", href: "/admin/products", icon: Package },
    { name: "Orders", href: "/admin/orders", icon: ShoppingCart },
    { name: "Users", href: "/admin/customers", icon: Users },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ];

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <div
        className={`${
          isSidebarOpen ? "w-64" : "w-20"
        } bg-indigo-800 text-white transition-all duration-300 ease-in-out`}
      >
        <div className="flex items-center justify-between p-4 border-b border-indigo-600">
          <h1 className={`font-bold text-xl ${!isSidebarOpen && "hidden"}`}>
            E-Shop Admin
          </h1>
          <button
            onClick={toggleSidebar}
            className="p-1 rounded-md hover:bg-indigo-700"
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
                    flex items-center p-4 hover:bg-indigo-700 ${
                      router.pathname === item.href ? "bg-indigo-700" : ""
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
        <div className="absolute bottom-0 w-full p-4">
          <button
            onClick={handleLogout}
            className={`flex items-center p-2 hover:bg-indigo-700 rounded-md w-full ${
              !isSidebarOpen && "justify-center"
            }`}
          >
            <LogOut size={20} />
            <span className={`ml-2 ${!isSidebarOpen && "hidden"}`}>Logout</span>
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm z-10">
          <div className="px-4 py-3 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                  <Search size={18} color="gray" />
                </span>
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 text-gray-500 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                  alt="Admin"
                  className="w-8 h-8 rounded-full border-2 border-indigo-500"
                />
                <span className="ml-2 font-medium text-black">Admin</span>
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

export default AdminLayout;
