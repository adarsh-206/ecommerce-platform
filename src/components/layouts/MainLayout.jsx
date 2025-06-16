"use client";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useEffect } from "react";

export const metadata = {
  title: "Chaka-Chak",
  description: "Your one-stop shop for all your shopping needs",
  icons: {
    icon: "/chaka-chak-logo.ico",
  },
};

export default function MainLayout({ children }) {
  const { isAuthenticated, user } = useAuth();
  const { syncLocalCartToServer, fetchCart } = useCart();

  useEffect(() => {
    if (isAuthenticated) {
      (async () => {
        await syncLocalCartToServer();
        await fetchCart();
      })();
    }
  }, [isAuthenticated]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
