"use client";
import AdminLayout from "@/components/layouts/AdminLayout";

export default function DashboardPage() {
  return (
    <AdminLayout>
      <div className="px-6 py-8">
        <h1 className="text-3xl font-extrabold text-amber-800 mb-2">
          Dashboard
        </h1>
        <p className="text-gray-600 text-sm mb-6">
          Welcome back, Super Admin. Here's a quick overview.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl shadow p-6 border border-amber-100">
            <h2 className="text-sm font-medium text-gray-500">Total Users</h2>
            <p className="text-3xl font-bold text-amber-700 mt-2">0</p>
          </div>

          <div className="bg-white rounded-2xl shadow p-6 border border-amber-100">
            <h2 className="text-sm font-medium text-gray-500">Total Orders</h2>
            <p className="text-3xl font-bold text-amber-700 mt-2">0</p>
          </div>

          <div className="bg-white rounded-2xl shadow p-6 border border-amber-100">
            <h2 className="text-sm font-medium text-gray-500">Revenue</h2>
            <p className="text-3xl font-bold text-amber-700 mt-2">₹0</p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
