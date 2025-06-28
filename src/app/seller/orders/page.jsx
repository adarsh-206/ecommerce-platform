"use client";

import { useEffect, useState } from "react";
import apiService from "@/app/utils/apiService";
import SellerLayout from "@/components/layouts/SellerLayout";
import {
  PackageCheck,
  User,
  MapPin,
  CheckCircle,
  X,
  ChevronDown,
  Clock,
  Truck,
  Package,
  AlertCircle,
  Phone,
  Calendar,
  Filter,
  Search,
  Download,
  RefreshCw,
} from "lucide-react";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [selectedReasons, setSelectedReasons] = useState([]);
  const [customNote, setCustomNote] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  const orderStatuses = [
    "placed",
    "confirmed",
    "packed",
    "shipped",
    "out_for_delivery",
    "delivered",
    "cancelled",
    "returned",
    "refund_initiated",
    "refunded",
  ];

  const predefinedReasons = [
    "Item is currently out of stock and unavailable",
    "Unable to deliver to the provided address",
    "Issue with product quality or specifications",
    "Customer requested cancellation",
    "Payment verification failed",
    "Delivery address is incomplete or incorrect",
    "Item damaged during packaging",
    "Shipping restrictions for this location",
  ];

  const getStatusConfig = (status) => {
    const configs = {
      placed: {
        color: "bg-blue-600",
        icon: Clock,
        canCancel: true,
        canUpdate: true,
        nextStates: ["confirmed", "cancelled"],
      },
      confirmed: {
        color: "bg-indigo-600",
        icon: CheckCircle,
        canCancel: true,
        canUpdate: true,
        nextStates: ["packed", "cancelled"],
      },
      packed: {
        color: "bg-yellow-600",
        icon: Package,
        canCancel: true,
        canUpdate: true,
        nextStates: ["shipped", "cancelled"],
      },
      shipped: {
        color: "bg-purple-600",
        icon: Truck,
        canCancel: false,
        canUpdate: true,
        nextStates: ["out_for_delivery", "delivered"],
      },
      out_for_delivery: {
        color: "bg-orange-600",
        icon: Truck,
        canCancel: false,
        canUpdate: true,
        nextStates: ["delivered", "returned"],
      },
      delivered: {
        color: "bg-emerald-600",
        icon: CheckCircle,
        canCancel: false,
        canUpdate: false,
        nextStates: [],
      },
      cancelled: {
        color: "bg-red-600",
        icon: X,
        canCancel: false,
        canUpdate: false,
        nextStates: [],
      },
      returned: {
        color: "bg-gray-600",
        icon: RefreshCw,
        canCancel: false,
        canUpdate: true,
        nextStates: ["refund_initiated"],
      },
      refund_initiated: {
        color: "bg-pink-600",
        icon: Clock,
        canCancel: false,
        canUpdate: true,
        nextStates: ["refunded"],
      },
      refunded: {
        color: "bg-teal-600",
        icon: CheckCircle,
        canCancel: false,
        canUpdate: false,
        nextStates: [],
      },
    };
    return (
      configs[status] || {
        color: "bg-gray-600",
        icon: AlertCircle,
        canCancel: false,
        canUpdate: false,
        nextStates: [],
      }
    );
  };

  const fetchOrders = async () => {
    try {
      const response = await apiService.get(
        "/order/get-order-for-seller",
        {},
        true
      );
      const sortedOrders =
        response?.data?.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        ) || [];
      setOrders(sortedOrders);
      setFilteredOrders(sortedOrders);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    if (newStatus === "cancelled") {
      setSelectedOrderId(orderId);
      setShowCancelModal(true);
      return;
    }

    try {
      await apiService.patch(
        `/order/${orderId}/status/`,
        { status: newStatus },
        true
      );
      await fetchOrders();
    } catch (error) {
      console.error("Failed to update order status:", error);
    }
  };

  const confirmCancellation = async () => {
    const note = [...selectedReasons, customNote].filter(Boolean).join("; ");
    try {
      await apiService.patch(
        `/order/${selectedOrderId}/status/`,
        {
          status: "cancelled",
          cancellationNote: note,
          cancelledAt: new Date().toISOString(),
          cancelledBy: "seller",
        },
        true
      );
      await fetchOrders();
      closeModal();
    } catch (error) {
      console.error("Failed to cancel order:", error);
    }
  };

  const closeModal = () => {
    setShowCancelModal(false);
    setSelectedReasons([]);
    setCustomNote("");
    setSelectedOrderId(null);
  };

  const handleCheckboxChange = (reason, checked) => {
    setSelectedReasons((prev) =>
      checked ? [...prev, reason] : prev.filter((r) => r !== reason)
    );
  };

  const formatStatusLabel = (status) => {
    return status.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
  };

  const filterOrders = () => {
    let filtered = orders;

    if (searchTerm) {
      filtered = filtered.filter(
        (order) =>
          order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.user?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.deliveryAddress?.fullName
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((order) => order.orderStatus === statusFilter);
    }

    if (dateFilter !== "all") {
      const now = new Date();
      const filterDate = new Date();

      switch (dateFilter) {
        case "today":
          filterDate.setHours(0, 0, 0, 0);
          filtered = filtered.filter(
            (order) => new Date(order.createdAt) >= filterDate
          );
          break;
        case "week":
          filterDate.setDate(now.getDate() - 7);
          filtered = filtered.filter(
            (order) => new Date(order.createdAt) >= filterDate
          );
          break;
        case "month":
          filterDate.setMonth(now.getMonth() - 1);
          filtered = filtered.filter(
            (order) => new Date(order.createdAt) >= filterDate
          );
          break;
      }
    }

    setFilteredOrders(filtered);
  };

  const getOrderPriority = (order) => {
    const hoursSinceCreated =
      (new Date() - new Date(order.createdAt)) / (1000 * 60 * 60);
    if (order.orderStatus === "placed" && hoursSinceCreated > 24) return "high";
    if (order.orderStatus === "confirmed" && hoursSinceCreated > 48)
      return "high";
    if (order.orderStatus === "packed" && hoursSinceCreated > 72)
      return "medium";
    return "normal";
  };

  const exportOrders = () => {
    const csvContent = [
      ["Order ID", "Customer", "Status", "Amount", "Date", "Items"].join(","),
      ...filteredOrders.map((order) =>
        [
          order.orderId,
          order.user?.email || "",
          order.orderStatus,
          order.totalAmount,
          new Date(order.createdAt).toLocaleDateString(),
          order.items.length,
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `orders-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    filterOrders();
  }, [searchTerm, statusFilter, dateFilter, orders]);

  return (
    <SellerLayout>
      <div className="p-6 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 gap-4">
          <h1 className="text-3xl font-bold text-orange-800 flex items-center gap-2">
            <PackageCheck className="w-7 h-7" />
            Order Management
            <span className="text-sm font-normal text-gray-600 ml-2">
              ({filteredOrders.length} orders)
            </span>
          </h1>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => fetchOrders()}
              className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
            <button
              onClick={exportOrders}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </button>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              <Filter className="w-4 h-4" />
              Filters
            </button>
          </div>
        </div>

        {showFilters && (
          <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Order ID, customer, etc."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  {orderStatuses.map((status) => (
                    <option key={status} value={status}>
                      {formatStatusLabel(status)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date Range
                </label>
                <select
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="all">All Time</option>
                  <option value="today">Today</option>
                  <option value="week">Last 7 Days</option>
                  <option value="month">Last 30 Days</option>
                </select>
              </div>

              <div className="flex items-end">
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setStatusFilter("all");
                    setDateFilter("all");
                  }}
                  className="w-full px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>
        )}

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((_, i) => (
              <div
                key={i}
                className="border border-amber-300 rounded-xl p-5 shadow animate-pulse"
              >
                <div className="h-6 bg-amber-100 rounded w-1/3 mb-4"></div>
                <div className="h-4 bg-amber-100 rounded w-1/2 mb-3"></div>
                <div className="h-24 bg-amber-100 rounded w-full mb-3"></div>
                <div className="h-5 bg-amber-100 rounded w-1/4"></div>
              </div>
            ))}
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="text-center text-gray-500 text-lg py-12">
            <PackageCheck className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            {orders.length === 0
              ? "No orders found."
              : "No orders match your filters."}
          </div>
        ) : (
          <div className="space-y-6">
            {filteredOrders.map((order) => {
              const statusConfig = getStatusConfig(order.orderStatus);
              const priority = getOrderPriority(order);
              const StatusIcon = statusConfig.icon;

              return (
                <div
                  key={order._id}
                  className={`border rounded-xl p-6 shadow-sm transition-all hover:shadow-md ${
                    priority === "high"
                      ? "border-red-300 bg-red-50"
                      : priority === "medium"
                      ? "border-yellow-300 bg-yellow-50"
                      : "border-gray-200 bg-white"
                  }`}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4 gap-4">
                    <div className="flex items-center gap-4">
                      <div className="text-xl font-semibold text-gray-800">
                        Order #{order.orderId}
                      </div>
                      {priority === "high" && (
                        <div className="flex items-center gap-1 text-red-600 text-sm font-medium">
                          <AlertCircle className="w-4 h-4" />
                          Urgent
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(order.createdAt).toLocaleString()}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <User className="w-5 h-5 mt-1 text-orange-600" />
                        <div>
                          <div className="font-medium text-gray-800">
                            {order.user?.email}
                          </div>
                          {order.user?.phone && (
                            <div className="flex items-center gap-1 text-sm text-gray-600">
                              <Phone className="w-3 h-3" />
                              {order.user.phone}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 mt-1 text-orange-600" />
                      <div>
                        <div className="font-medium text-gray-800">
                          {order.deliveryAddress?.fullName}
                        </div>
                        <div className="text-sm text-gray-600">
                          {order.deliveryAddress?.addressLine1}
                          {order.deliveryAddress?.addressLine2 &&
                            `, ${order.deliveryAddress.addressLine2}`}
                        </div>
                        <div className="text-sm text-gray-600">
                          {order.deliveryAddress?.city},{" "}
                          {order.deliveryAddress?.state} -{" "}
                          {order.deliveryAddress?.postalCode}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 mb-6">
                    {order.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-4 bg-gray-50 rounded-lg p-4"
                      >
                        <img
                          src={item.product?.url}
                          alt={item.product?.name}
                          className="w-16 h-16 object-cover rounded-lg border"
                        />
                        <div className="flex-1">
                          <div className="font-medium text-gray-800">
                            {item.product?.name}
                          </div>
                          <div className="text-sm text-gray-600 flex items-center gap-4 mt-1">
                            <span>Size: {item.size}</span>
                            <span>Qty: {item.quantity}</span>
                            <div className="flex items-center gap-1">
                              Color:
                              <span
                                className="inline-block w-4 h-4 rounded-full border border-gray-300 ml-1"
                                style={{ backgroundColor: item.color }}
                              ></span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-gray-800">
                            ₹{item.priceAtPurchase}
                          </div>
                          <div className="text-xs text-gray-500">per item</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center gap-6">
                      {order.payment?.paymentStatus === "paid" && (
                        <div className="flex items-center text-green-600 gap-1 text-sm">
                          <CheckCircle className="w-4 h-4" />
                          <span>Payment Received</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1 font-bold text-lg text-orange-700">
                        Total: ₹{order.totalAmount}
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      {statusConfig.canCancel && (
                        <button
                          onClick={() =>
                            updateOrderStatus(order.orderId, "cancelled")
                          }
                          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                        >
                          Cancel Order
                        </button>
                      )}

                      {statusConfig.canUpdate &&
                        statusConfig.nextStates.length > 0 && (
                          <div className="relative">
                            <select
                              value={order.orderStatus}
                              onChange={(e) =>
                                updateOrderStatus(order.orderId, e.target.value)
                              }
                              className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent cursor-pointer min-w-[140px]"
                            >
                              <option value={order.orderStatus}>
                                Update Status
                              </option>
                              {statusConfig.nextStates.map((status) => (
                                <option key={status} value={status}>
                                  {formatStatusLabel(status)}
                                </option>
                              ))}
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-600 pointer-events-none" />
                          </div>
                        )}

                      <div
                        className={`flex items-center gap-2 text-white px-4 py-2 rounded-lg text-sm font-medium ${statusConfig.color}`}
                      >
                        <StatusIcon className="w-4 h-4" />
                        {formatStatusLabel(order.orderStatus)}
                      </div>
                    </div>
                  </div>

                  {order.cancellationNote && (
                    <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                      <div className="text-sm text-red-800">
                        <strong>Cancellation Reason:</strong>{" "}
                        {order.cancellationNote}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {showCancelModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-8 max-w-2xl w-full mx-4 shadow-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  Cancel Order
                </h2>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="mb-6">
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Please select one or more reasons for cancelling this order.
                  This information will be shared with the customer and may
                  affect your seller rating.
                </p>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
                    <div className="text-sm text-amber-800">
                      <strong>Important:</strong> Frequent cancellations may
                      impact your seller performance metrics.
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                {predefinedReasons.map((reason, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() =>
                      handleCheckboxChange(
                        reason,
                        !selectedReasons.includes(reason)
                      )
                    }
                  >
                    <input
                      type="checkbox"
                      id={`reason-${index}`}
                      className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500 mt-1 flex-shrink-0"
                      checked={selectedReasons.includes(reason)}
                      onChange={(e) =>
                        handleCheckboxChange(reason, e.target.checked)
                      }
                    />
                    <label
                      htmlFor={`reason-${index}`}
                      className="text-sm text-gray-800 leading-relaxed cursor-pointer"
                    >
                      {reason}
                    </label>
                  </div>
                ))}
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-800 mb-3">
                  Additional Notes (Optional)
                </label>
                <textarea
                  className="w-full p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-800 placeholder-gray-500"
                  rows="4"
                  placeholder="Provide any additional details or specific reasons for cancellation..."
                  value={customNote}
                  onChange={(e) => setCustomNote(e.target.value)}
                />
              </div>

              <div className="flex gap-4 pt-6 border-t border-gray-200">
                <button
                  onClick={closeModal}
                  className="flex-1 px-6 py-3 text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium transition-colors"
                >
                  Keep Order Active
                </button>
                <button
                  onClick={confirmCancellation}
                  disabled={selectedReasons.length === 0 && !customNote.trim()}
                  className="flex-1 px-6 py-3 bg-red-600 hover:bg-red-700 disabled:bg-red-300 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors"
                >
                  Confirm Cancellation
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </SellerLayout>
  );
}
