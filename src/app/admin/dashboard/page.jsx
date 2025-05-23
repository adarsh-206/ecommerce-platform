"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "@/components/layouts/AdminLayout";
import AdminDashboard from "@/components/admin/dashboard/AdminDashboard";

// Rename this function to avoid conflict
export default function AdminDashboardPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/admin");
    }
  }, []);

  return <AdminDashboard />;
}
