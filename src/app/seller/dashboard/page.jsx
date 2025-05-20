"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import SellerDashboard from "@/components/seller/dashboard/SellerDashboard";

// Rename this function to avoid conflict
export default function AdminDashboardPage() {
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      router.push("/admin");
    }
  }, []);

  return <SellerDashboard />;
}
