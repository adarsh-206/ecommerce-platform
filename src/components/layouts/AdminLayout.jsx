"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut, Menu, Bell, Search, Home, MessageSquare } from "lucide-react";
import { useUser } from "@/context/UserContext";

export const metadata = {
  title: "Chaka-Chak | Clean, Quirky, Totally You",
  description:
    "Shop Chaka-Chak for bold fashion, eye-catching accessories, and stylish decor — made just for you. Unique finds, fast shipping, and good vibes only.",
  icons: {
    icon: "/chaka-chak-logo.ico",
  },
};

export const AdminLayout = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const router = useRouter();
  const { userDetails } = useUser();

  useEffect(() => {
    const loggedIn = localStorage.getItem("token") ? true : false;
    setIsLoggedIn(loggedIn);
    if (!loggedIn) {
      router.push("/super-admin/login");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/super-admin/login");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const navItems = [
    { name: "Dashboard", href: "/super-admin/dashboard", icon: Home },
    { name: "Blogs", href: "/super-admin/blogs", icon: MessageSquare },
  ];

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="flex h-screen bg-amber-50">
      <div
        className={`${
          isSidebarOpen ? "w-64" : "w-20"
        } bg-gradient-to-br from-amber-100 via-orange-100 to-rose-100 text-amber-900 transition-all duration-300`}
      >
        <div className="flex items-center justify-between p-4 border-b border-orange-300">
          <Link href="/">
            <h1 className={`font-bold text-xl ${!isSidebarOpen && "hidden"}`}>
              Chaka-Chak
            </h1>
          </Link>
          <button onClick={toggleSidebar} className="p-1 rounded-md">
            <Menu size={24} />
          </button>
        </div>

        <nav className="mt-6">
          <ul>
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center p-4 hover:bg-amber-200 ${
                    router.pathname === item.href
                      ? "bg-amber-300 font-bold"
                      : ""
                  }`}
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
            className={`flex items-center p-2 rounded-md hover:bg-rose-100 transition-colors ${
              !isSidebarOpen ? "justify-center" : ""
            }`}
          >
            <LogOut size={20} />
            <span className={`ml-2 ${!isSidebarOpen && "hidden"}`}>Logout</span>
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm">
          <div className="px-4 py-3 flex justify-between items-center">
            <div className="relative w-full max-w-xs">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <Search size={18} className="text-amber-600" />
              </span>
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 text-sm text-gray-700 rounded-md border border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500 w-full"
              />
            </div>
            <div className="flex items-center gap-4">
              <button className="relative p-2 rounded-full hover:bg-amber-100">
                <Bell size={20} className="text-amber-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center">
                <img
                  src="https://t3.ftcdn.net/jpg/03/62/56/24/360_F_362562495_Gau0POzcwR8JCfQuikVUTqzMFTo78vkF.jpg"
                  alt="Admin"
                  className="w-8 h-8 rounded-full border-2 border-amber-500"
                />
                <span className="ml-2 font-medium text-sm text-black">
                  {userDetails?.fullName || "Super Admin"}
                </span>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 bg-white">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
