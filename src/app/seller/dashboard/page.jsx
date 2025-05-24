"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import SellerDashboard from "@/components/seller/dashboard/SellerDashboard";

export default function SellerDashboardPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/admin");
    }
  }, []);

  return <SellerDashboard />;
}
