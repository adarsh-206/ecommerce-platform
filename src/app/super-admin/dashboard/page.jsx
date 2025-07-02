"use client";
import { useEffect, useState } from "react";
import AdminLayout from "@/components/layouts/AdminLayout";
import apiService from "@/app/utils/apiService";
import { User, ShoppingCart, IndianRupee, Users } from "lucide-react";

const DashboardCard = ({ title, value, icon: Icon, color }) => {
  const colorMap = {
    amber: {
      bg: "bg-amber-100",
      text: "text-amber-600",
    },
    orange: {
      bg: "bg-orange-100",
      text: "text-orange-600",
    },
    green: {
      bg: "bg-green-100",
      text: "text-green-600",
    },
    rose: {
      bg: "bg-rose-100",
      text: "text-rose-600",
    },
  };

  return (
    <div className="bg-white rounded-2xl shadow p-6 border border-amber-100 transition hover:shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-medium text-gray-500">{title}</h2>
          <p className="text-3xl font-bold text-amber-700 mt-2">{value}</p>
        </div>
        <div className={`p-3 rounded-full ${colorMap[color]?.bg}`}>
          <Icon className={`${colorMap[color]?.text}`} size={24} />
        </div>
      </div>
    </div>
  );
};

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalBuyers: 0,
    totalOrders: 0,
    totalRevenue: 0,
  });

  const fetchStats = async () => {
    try {
      const response = await apiService.get("/order/admin/stats", {}, true);
      setStats(response.data);
    } catch (error) {
      setStats({
        totalUsers: 0,
        totalBuyers: 0,
        totalOrders: 0,
        totalRevenue: 0,
      });
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      fetchStats();
    }
  }, []);

  return (
    <AdminLayout>
      <div className="px-6 py-8">
        <h1 className="text-3xl font-extrabold text-amber-800 mb-2">
          Dashboard
        </h1>
        <p className="text-gray-600 text-sm mb-6">
          Welcome back, Super Admin. Here's a quick overview.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <DashboardCard
            title="Total Users"
            value={stats.totalUsers}
            icon={Users}
            color="amber"
          />
          <DashboardCard
            title="Total Buyers"
            value={stats.totalBuyers}
            icon={User}
            color="rose"
          />
          <DashboardCard
            title="Total Orders"
            value={stats.totalOrders}
            icon={ShoppingCart}
            color="orange"
          />
          <DashboardCard
            title="Revenue"
            value={`₹${stats.totalRevenue}`}
            icon={IndianRupee}
            color="green"
          />
        </div>
      </div>
    </AdminLayout>
  );
}
