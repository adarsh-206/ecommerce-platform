export const metadata = {
  title: "Admin Dashboard",
  description:
    "Manage products, orders, and users for your Indian eCommerce store",
};

import { AdminLayout } from "../../layouts/AdminLayout";
import {
  Package,
  ShoppingCart,
  Users,
  IndianRupee,
  TrendingUp,
  AlertCircle,
} from "lucide-react";

const DashboardCard = ({ title, value, icon: Icon, color }) => {
  const colorMap = {
    indigo: {
      bg: "bg-indigo-100",
      text: "text-indigo-600",
    },
    purple: {
      bg: "bg-purple-100",
      text: "text-purple-600",
    },
    blue: {
      bg: "bg-blue-100",
      text: "text-blue-600",
    },
    green: {
      bg: "bg-green-100",
      text: "text-green-600",
    },
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 transition hover:shadow-xl">
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

const RecentOrder = ({ id, customer, date, status, amount }) => {
  const statusColors = {
    completed: "bg-green-100 text-green-700",
    processing: "bg-blue-100 text-blue-700",
    shipped: "bg-indigo-100 text-indigo-700",
    cancelled: "bg-red-100 text-red-700",
    pending: "bg-yellow-100 text-yellow-700",
  };

  return (
    <tr className="border-b border-gray-200 text-gray-700">
      <td className="py-3 pl-6">{id}</td>
      <td className="py-3">{customer}</td>
      <td className="py-3">{date}</td>
      <td className="py-3">
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[status]}`}
        >
          {status?.charAt(0)?.toUpperCase() + status?.slice(1)}
        </span>
      </td>
      <td className="py-3 pr-6">₹{amount}</td>
    </tr>
  );
};

const LowStockItem = ({ id, name, stock, supplier }) => {
  return (
    <div className="flex items-center justify-between py-4 border-b border-gray-200">
      <div>
        <p className="font-medium text-gray-800">{name}</p>
        <p className="text-sm text-gray-500">ID: {id}</p>
        <p className="text-sm text-gray-500">Supplier: {supplier}</p>
      </div>
      <div className="flex items-center">
        <span className="text-red-600 font-medium mr-2">{stock} left</span>
      </div>
    </div>
  );
};

export default function AdminDashboard() {
  const recentOrders = [
    {
      id: "ORD-IN1024",
      customer: "Amit Sharma",
      date: "13 May 2025",
      status: "completed",
      amount: "1599.00",
    },
    {
      id: "ORD-IN1023",
      customer: "Pooja Patel",
      date: "12 May 2025",
      status: "processing",
      amount: "799.00",
    },
  ];

  const lowStockItems = [
    {
      id: "PRD-IN203",
      name: "Bluetooth Speaker",
      stock: 2,
      supplier: "GadgetKart India",
    },
    {
      id: "PRD-IN158",
      name: "Fitness Band Pro",
      stock: 4,
      supplier: "TechWorld Mumbai",
    },
  ];

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600">Welcome back to E-shop admin panel</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <DashboardCard
          title="Total Orders"
          value="2,304"
          icon={ShoppingCart}
          trend="+10.5%"
          color="indigo"
        />
        <DashboardCard
          title="Total Products"
          value="1,120"
          icon={Package}
          trend="+6.3%"
          color="purple"
        />
        <DashboardCard
          title="Customers"
          value="5,674"
          icon={Users}
          trend="+15.8%"
          color="blue"
        />
        <DashboardCard
          title="Revenue"
          value="₹4,82,350"
          icon={IndianRupee}
          trend="+22.1%"
          color="green"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">
              Recent Orders
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="text-left py-3 pl-6 font-medium">Order ID</th>
                  <th className="text-left py-3 font-medium">Customer</th>
                  <th className="text-left py-3 font-medium">Date</th>
                  <th className="text-left py-3 font-medium">Status</th>
                  <th className="text-left py-3 pr-6 font-medium">Amount</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <RecentOrder key={order.id} {...order} />
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 border-t border-gray-100 bg-gray-50">
            <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
              View all orders →
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg">
          <div className="p-6 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-800">
              Low Stock Alert
            </h2>
            <AlertCircle size={20} className="text-red-600" />
          </div>
          <div className="p-6">
            {lowStockItems.map((item) => (
              <LowStockItem key={item.id} {...item} />
            ))}
          </div>
          <div className="p-4 border-t border-gray-100 bg-gray-50">
            <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
              View inventory →
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
