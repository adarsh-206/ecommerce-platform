export const metadata = {
  title: "Chaka-Chak | Clean, Quirky, Totally You",
  description:
    "Shop Chaka-Chak for bold fashion, eye-catching accessories, and stylish decor — made just for you. Unique finds, fast shipping, and good vibes only.",
  icons: {
    icon: "/chaka-chak-logo.ico",
  },
};

import apiService from "@/app/utils/apiService";
import { SellerLayout } from "../../layouts/SellerLayout";
import { Package, ShoppingCart, IndianRupee } from "lucide-react";
import { useEffect, useState } from "react";

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
  };

  return (
    <div className="bg-white rounded-xl shadow p-6 transition hover:shadow-md border border-rose-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm">{title}</p>
          <h3 className="text-2xl font-semibold mt-1 text-gray-800">{value}</h3>
        </div>
        <div className={`p-3 rounded-full ${colorMap[color]?.bg}`}>
          <Icon className={`${colorMap[color]?.text}`} size={24} />
        </div>
      </div>
    </div>
  );
};

export default function SellerDashboard() {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalProducts: 0,
    totalRevenue: 0,
  });

  const fetchStats = async () => {
    try {
      const response = await apiService.get("/order/seller/stats", {}, true);
      const data = response.data;
      setStats(data);
    } catch (error) {
      setStats({ totalOrders: 0, totalProducts: 0, totalRevenue: 0 });
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      fetchStats();
    }
  }, []);

  return (
    <SellerLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600">Welcome back to Chaka-Chak</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <DashboardCard
          title="Total Orders"
          value={stats.totalOrders}
          icon={ShoppingCart}
          color="amber"
        />
        <DashboardCard
          title="Total Products"
          value={stats.totalProducts}
          icon={Package}
          color="orange"
        />
        <DashboardCard
          title="Revenue"
          value={`₹${stats.totalRevenue}`}
          icon={IndianRupee}
          color="green"
        />
      </div>
    </SellerLayout>
  );
}
