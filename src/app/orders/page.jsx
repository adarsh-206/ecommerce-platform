"use client";

import { useEffect, useState } from "react";
import MainLayout from "@/components/layouts/MainLayout";
import { useAuth } from "@/context/AuthContext";
import apiService from "../utils/apiService";
import {
  Loader,
  Truck,
  PackageCheck,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";

export const ordersMetadata = {
  title: "My Orders | Chaka-Chak - Track Orders & Purchase History",
  description:
    "Keep track of all your Chaka-Chak orders in one convenient location, from recent purchases to your complete shopping history with us. Our comprehensive orders section provides detailed information about every purchase you've made, including current order status, tracking information, delivery updates, and past purchase records. You can easily monitor the progress of your recent orders from the moment they're confirmed through processing, packing, shipping, and final delivery to your doorstep. Each order entry includes complete details such as order date, items purchased, quantities, sizes, colors, individual and total pricing, payment method used, shipping address, and expected delivery date. Our real-time tracking system keeps you informed about your package's journey with regular updates and the ability to track your shipment directly through our integrated tracking interface. For past orders, you can view complete purchase history, reorder favorite items with just a few clicks, download invoices for your records, and access customer support for any order-related questions or concerns. The orders section also allows you to manage returns and exchanges, providing easy access to our return process, return shipping labels, and status updates on any returns or exchanges you've initiated. You can filter and search through your order history by date, product type, order status, or other criteria to quickly find specific purchases. This comprehensive order management system ensures that you have complete visibility and control over your Chaka-Chak shopping experience, making it easy to stay organized and informed about all your fashion purchases.",
  keywords:
    "chaka chak orders, track orders, order history, purchase tracking, order status",
  icons: {
    icon: "/chaka-chak-logo.ico",
    apple: "/chaka-chak-logo.png",
  },
};

export default function OrdersPage() {
  const { isAuthenticated } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await apiService.get("/order/buyer/orders", {}, true);
      setOrders(res.data || []);
    } catch (err) {
      console.error("Failed to fetch orders", err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return dateString
      ? new Date(dateString).toLocaleDateString("en-IN", {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
      : "";
  };

  const getStatusColor = (status) => {
    switch ((status || "").toLowerCase()) {
      case "placed":
        return "bg-blue-100 text-blue-700";
      case "processing":
        return "bg-yellow-100 text-yellow-700";
      case "shipped":
        return "bg-purple-100 text-purple-700";
      case "delivered":
        return "bg-green-100 text-green-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchOrders();
    }
  }, [isAuthenticated]);

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 p-4 sm:p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-bold text-amber-800 mb-6">
            My Orders
          </h1>

          {loading ? (
            <div className="flex justify-center items-center h-40">
              <Loader className="animate-spin text-amber-600 w-6 h-6" />
              <span className="ml-2 text-amber-700 font-medium">
                Loading orders...
              </span>
            </div>
          ) : orders.length === 0 ? (
            <div className="text-center text-amber-700 font-medium">
              <AlertTriangle className="mx-auto mb-2 w-8 h-8 text-amber-600" />
              No orders found.
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <Link
                  key={order.orderId}
                  href={`/order/${order.orderId}`}
                  className="block transition-transform duration-200 hover:scale-[1.01]"
                >
                  <div className="bg-white rounded-lg shadow-lg p-5 border border-amber-200">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2">
                      <div>
                        {order.orderId && (
                          <div className="text-lg font-semibold text-amber-800">
                            Order ID: {order.orderId}
                          </div>
                        )}
                        {order.createdAt && (
                          <div className="text-sm text-amber-600">
                            Placed on: {formatDate(order.createdAt)}
                          </div>
                        )}
                      </div>
                      {order.orderStatus && (
                        <div
                          className={`w-fit inline-block text-sm px-3 py-1 rounded-full capitalize ${getStatusColor(
                            order.orderStatus
                          )}`}
                        >
                          {order.orderStatus}
                        </div>
                      )}
                    </div>

                    <div className="space-y-3">
                      {(order.items || []).map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-4 bg-amber-50 p-3 rounded-lg border border-amber-100"
                        >
                          <div className="w-16 h-16 bg-amber-100 rounded border border-amber-200 overflow-hidden flex items-center justify-center">
                            {item?.product?.url && (
                              <img
                                src={item.product.url}
                                alt={item.product.name || "Product"}
                                className="object-cover w-full h-full"
                              />
                            )}
                          </div>
                          <div className="flex-1">
                            {item?.product?.name && (
                              <p className="text-sm font-semibold text-amber-800">
                                {item.product.name}
                              </p>
                            )}
                            <div className="flex flex-wrap gap-4 text-xs text-amber-600 mt-1">
                              {item.size && <span>Size: {item.size}</span>}
                              {item.color && <span>Color: {item.color}</span>}
                              {item.quantity && (
                                <span>Quantity: {item.quantity}</span>
                              )}
                            </div>
                            {item.priceAtPurchase != null &&
                              item.quantity != null && (
                                <p className="text-sm font-semibold text-amber-700 mt-2">
                                  ₹{item.priceAtPurchase} × {item.quantity} = ₹
                                  {(
                                    item.priceAtPurchase * item.quantity
                                  ).toFixed(2)}
                                </p>
                              )}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 pt-4 border-t border-amber-200">
                      <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
                        {order.deliveryAddress?.fullName && (
                          <div className="flex items-center gap-2 text-sm text-amber-700">
                            <Truck className="w-4 h-4" />
                            <span>
                              {[
                                order.deliveryAddress.fullName,
                                order.deliveryAddress.addressLine1,
                                order.deliveryAddress.city,
                                order.deliveryAddress.postalCode,
                                order.deliveryAddress.state,
                                order.deliveryAddress.country,
                              ]
                                .filter(Boolean)
                                .join(", ")}
                            </span>
                          </div>
                        )}
                        {order.totalAmount != null && (
                          <div className="flex items-center gap-2 text-sm font-semibold text-amber-800">
                            <PackageCheck className="w-4 h-4" />
                            <span>Total: ₹{order.totalAmount.toFixed(2)}</span>
                          </div>
                        )}
                      </div>

                      {order.payment?.paymentStatus && (
                        <div className="mt-2 text-xs text-amber-600 flex items-center gap-2">
                          <span className="flex items-center gap-1">
                            Payment:
                            <span className="capitalize font-medium flex items-center gap-1">
                              {order.payment.paymentStatus}
                              {order.payment.paymentStatus.toLowerCase() ===
                                "paid" && (
                                <CheckCircle className="w-4 h-4 text-green-600" />
                              )}
                            </span>
                            {order.payment.transactionId && (
                              <span className="ml-2">
                                (Transaction ID: {order.payment.transactionId})
                              </span>
                            )}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
