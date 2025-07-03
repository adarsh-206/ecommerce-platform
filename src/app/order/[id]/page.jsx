"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import MainLayout from "@/components/layouts/MainLayout";
import apiService from "@/app/utils/apiService";
import { showToast } from "@/utils/showToast";
import {
  AlertTriangle,
  CheckCircle,
  MapPin,
  Package,
  Calendar,
  Copy,
  Phone,
  IndianRupee,
  Home,
  ChevronRight,
  Download,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import { getColorName } from "@/constants/color";

export default function OrderPage({ params }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deliveryAddress, setDeliveryAddress] = useState(null);
  const [downloadingInvoice, setDownloadingInvoice] = useState(false);

  const fetchOrder = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await apiService.get(
        `/order/${resolvedParams.id}`,
        {},
        true
      );

      setOrder(response.data);
    } catch (err) {
      console.error("Failed to fetch order", err);
      setError(err.response?.data?.message || "Failed to fetch order details");
    } finally {
      setLoading(false);
    }
  };

  const downloadInvoice = async () => {
    try {
      setDownloadingInvoice(true);

      const { jsPDF } = await import("jspdf");
      const doc = new jsPDF();

      const currentDate = new Date();
      const invoiceNumber = `INV-${order.orderId}-${currentDate.getFullYear()}`;
      const subtotal =
        order.items?.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        ) || 0;

      doc.setFontSize(24);
      doc.setFont(undefined, "bold");
      doc.text("Chaka-Chak", 105, 25, { align: "center" });

      doc.setFontSize(10);
      doc.setFont(undefined, "normal");
      doc.text(
        "Email: chakachakteam@gmail.com | Instagram: @chakachakteam",
        105,
        35,
        { align: "center" }
      );

      doc.setLineWidth(0.5);
      doc.line(20, 45, 190, 45);

      doc.setFontSize(12);
      doc.setFont(undefined, "bold");
      doc.text("Invoice Details", 20, 60);

      doc.setFont(undefined, "normal");
      doc.setFontSize(10);
      doc.text(`Invoice No: ${invoiceNumber}`, 20, 70);
      doc.text(
        `Invoice Date: ${currentDate.toLocaleDateString("en-IN")}`,
        20,
        80
      );
      doc.text(`Order ID: ${order.orderId}`, 20, 90);

      doc.text(
        `Payment Status: ${order.payment?.status?.toUpperCase() || "PENDING"}`,
        110,
        70
      );
      doc.text(
        `Order Date: ${new Date(order.createdAt).toLocaleDateString("en-IN")}`,
        110,
        80
      );

      doc.setFont(undefined, "bold");
      doc.text("Bill To:", 20, 110);
      doc.text("Ship To:", 110, 110);

      doc.setFont(undefined, "normal");
      const billToY = 120;
      const shipToY = 120;

      doc.text(order.deliveryAddress?.fullName || "Customer", 20, billToY);
      doc.text(order.deliveryAddress?.addressLine1 || "", 20, billToY + 10);
      if (order.deliveryAddress?.addressLine2) {
        doc.text(order.deliveryAddress.addressLine2, 20, billToY + 20);
      }
      doc.text(
        `${order.deliveryAddress?.city || ""}, ${
          order.deliveryAddress?.state || ""
        } - ${order.deliveryAddress?.postalCode || ""}`,
        20,
        billToY + 30
      );
      doc.text(order.deliveryAddress?.country || "India", 20, billToY + 40);
      if (order.deliveryAddress?.phone) {
        doc.text(`Phone: ${order.deliveryAddress.phone}`, 20, billToY + 50);
      }

      doc.text(order.deliveryAddress?.fullName || "Customer", 110, shipToY);
      doc.text(order.deliveryAddress?.addressLine1 || "", 110, shipToY + 10);
      if (order.deliveryAddress?.addressLine2) {
        doc.text(order.deliveryAddress.addressLine2, 110, shipToY + 20);
      }
      doc.text(
        `${order.deliveryAddress?.city || ""}, ${
          order.deliveryAddress?.state || ""
        } - ${order.deliveryAddress?.postalCode || ""}`,
        110,
        shipToY + 30
      );
      doc.text(order.deliveryAddress?.country || "India", 110, shipToY + 40);
      if (order.deliveryAddress?.phone) {
        doc.text(`Phone: ${order.deliveryAddress.phone}`, 110, shipToY + 50);
      }

      const tableStartY = 180;
      doc.setFont(undefined, "bold");
      doc.setFontSize(11);
      doc.text("Items", 20, tableStartY);

      doc.setLineWidth(0.3);
      doc.line(20, tableStartY + 5, 190, tableStartY + 5);

      const headers = [
        "S.No",
        "Description",
        "Qty",
        "Rate (Rs. )",
        "Amount (Rs. )",
      ];
      const headerY = tableStartY + 15;
      const colWidths = [15, 80, 20, 30, 35];
      let xPos = 20;

      doc.setFont(undefined, "bold");
      doc.setFontSize(9);
      headers.forEach((header, index) => {
        doc.text(header, xPos, headerY);
        xPos += colWidths[index];
      });

      doc.line(20, headerY + 3, 190, headerY + 3);

      doc.setFont(undefined, "normal");
      let currentY = headerY + 15;

      order.items?.forEach((item, index) => {
        if (currentY > 250) {
          doc.addPage();
          currentY = 30;
        }

        xPos = 20;
        doc.text((index + 1).toString(), xPos, currentY);
        xPos += colWidths[0];

        const description = `${item.name}\nSize: ${
          item.size
        }, Color: ${getColorName(item.color)}`;
        const lines = doc.splitTextToSize(description, colWidths[1] - 5);
        doc.text(lines, xPos, currentY);
        xPos += colWidths[1];

        doc.text(item.quantity.toString(), xPos, currentY);
        xPos += colWidths[2];

        doc.text(item.price?.toLocaleString("en-IN"), xPos, currentY);
        xPos += colWidths[3];

        doc.text(
          (item.price * item.quantity)?.toLocaleString("en-IN"),
          xPos,
          currentY
        );

        currentY += Math.max(15, lines.length * 5);
        doc.line(20, currentY - 5, 190, currentY - 5);
      });

      currentY += 10;
      const totalStartX = 130;

      doc.setFont(undefined, "normal");
      doc.text("Subtotal:", totalStartX, currentY);
      doc.text(`Rs. ${subtotal.toLocaleString("en-IN")}`, 170, currentY);

      currentY += 10;
      doc.text("Shipping:", totalStartX, currentY);
      doc.text("Rs. 0", 170, currentY);

      currentY += 10;
      doc.setFont(undefined, "bold");
      doc.setLineWidth(0.5);
      doc.line(totalStartX, currentY - 3, 190, currentY - 3);
      doc.text("Total Amount:", totalStartX, currentY + 5);
      doc.text(
        `Rs. ${order.totalAmount?.toLocaleString("en-IN")}`,
        170,
        currentY + 5
      );

      currentY += 20;
      doc.setFont(undefined, "normal");
      doc.setFontSize(9);
      doc.setTextColor(150);
      doc.text(
        "This is a computer generated invoice and does not require physical signature.",
        105,
        currentY,
        { align: "center" }
      );
      doc.setTextColor(0);

      doc.save(`Invoice-${order.orderId}.pdf`);
      showToast.success("Invoice downloaded successfully!");
    } catch (error) {
      console.error("Error downloading invoice:", error);
      showToast.error("Failed to download invoice. Please try again.");
    } finally {
      setDownloadingInvoice(false);
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
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "processing":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "shipped":
        return "bg-purple-100 text-purple-700 border-purple-200";
      case "delivered":
        return "bg-green-100 text-green-700 border-green-200";
      case "cancelled":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getPaymentStatusColor = (status) => {
    switch ((status || "").toLowerCase()) {
      case "paid":
        return "text-green-600 bg-green-50 border-green-200";
      case "pending":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "failed":
        return "text-red-600 bg-red-50 border-red-200";
      case "refunded":
        return "text-blue-600 bg-blue-50 border-blue-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    showToast.success("Copied to clipboard!");
  };

  useEffect(() => {
    if (resolvedParams.id) {
      fetchOrder();
    }
  }, [resolvedParams.id]);

  const LoadingSkeleton = () => (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="animate-pulse">
        <div className="h-6 bg-amber-200 rounded w-48 mb-8"></div>

        <div className="bg-white rounded-2xl shadow-xl border border-amber-200 overflow-hidden">
          <div className="bg-gradient-to-r from-amber-400 to-orange-500 p-8">
            <div className="flex justify-between items-center">
              <div>
                <div className="h-8 bg-white/20 rounded w-48 mb-2"></div>
                <div className="h-4 bg-white/20 rounded w-64"></div>
              </div>
              <div className="h-8 bg-white/20 rounded w-24"></div>
            </div>
          </div>

          <div className="p-8 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-amber-50 p-6 rounded-xl">
                  <div className="h-6 bg-amber-200 rounded w-32 mb-4"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-amber-200 rounded w-full"></div>
                    <div className="h-4 bg-amber-200 rounded w-3/4"></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-amber-50 p-6 rounded-xl">
              <div className="h-6 bg-amber-200 rounded w-40 mb-4"></div>
              <div className="space-y-4">
                {[1, 2].map((i) => (
                  <div key={i} className="bg-white p-4 rounded-lg">
                    <div className="h-5 bg-amber-200 rounded w-48 mb-2"></div>
                    <div className="h-4 bg-amber-200 rounded w-full"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
        {loading ? (
          <LoadingSkeleton />
        ) : error ? (
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-white rounded-2xl shadow-xl p-12 text-center border border-rose-200">
              <AlertTriangle className="w-16 h-16 mx-auto text-rose-500 mb-6" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Order Not Found
              </h2>
              <p className="text-rose-600 text-lg">{error}</p>
            </div>
          </div>
        ) : (
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <nav className="flex items-center space-x-2 text-sm font-medium text-amber-700 mb-8">
              <Link
                href="/"
                className="hover:text-orange-600 transition-colors flex items-center gap-1"
              >
                <Home className="w-4 h-4" />
                Home
              </Link>
              <ChevronRight className="w-4 h-4" />
              <Link
                href="/orders"
                className="hover:text-orange-600 transition-colors"
              >
                Orders
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-amber-900 font-semibold">
                {order.orderId}
              </span>
            </nav>

            <div className="bg-white rounded-2xl shadow-xl border border-amber-200 overflow-hidden">
              <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-8 text-white">
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6">
                  <div className="flex-1">
                    <h1 className="text-3xl font-bold flex items-center gap-3 mb-2">
                      <Package className="w-8 h-8" />
                      Order Details
                    </h1>
                    <p className="text-amber-100 text-lg">
                      Order ID:{" "}
                      <span className="font-mono font-semibold">
                        {order.orderId}
                      </span>
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                    <div
                      className={`inline-flex items-center gap-2 px-6 py-3 rounded-full border text-sm font-bold shadow-lg ${getStatusColor(
                        order.orderStatus
                      )}`}
                    >
                      <Package className="w-4 h-4" />
                      {order.orderStatus?.toUpperCase()}
                    </div>
                    <div className="text-right">
                      <p className="text-amber-100 text-sm">Total Amount</p>
                      <p className="text-3xl font-bold flex items-center gap-1">
                        <IndianRupee className="w-6 h-6" />
                        {order.totalAmount?.toLocaleString("en-IN")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8">
                <div className="flex justify-end mb-6">
                  <button
                    onClick={downloadInvoice}
                    disabled={downloadingInvoice}
                    className="bg-gradient-to-r from-amber-400 via-rose-500 to-orange-500 hover:from-rose-500 hover:to-orange-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Download className="w-5 h-5" />
                    {downloadingInvoice ? "Downloading..." : "Download Invoice"}
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                  <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-xl border border-amber-200">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-amber-100 rounded-lg">
                        <Calendar className="w-5 h-5 text-amber-600" />
                      </div>
                      <h3 className="font-bold text-amber-900 text-lg">
                        Order Information
                      </h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                      <div>
                        <p className="text-sm text-amber-700 font-medium">
                          Order Placed
                        </p>
                        <p className="text-amber-900 font-semibold">
                          {formatDate(order.createdAt)}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-amber-700 font-medium">
                          Order ID
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="font-mono bg-amber-100 px-3 py-1 rounded-lg text-sm text-orange-500 font-semibold">
                            {order.orderId}
                          </span>
                          <button
                            onClick={() => copyToClipboard(order.orderId)}
                            className="text-amber-600 hover:text-amber-800 transition-colors p-1 hover:bg-amber-50 rounded"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <p className="text-sm text-amber-700 font-medium whitespace-nowrap">
                          Payment Status:
                        </p>
                        <span
                          className={`px-4 py-2 rounded-full border text-sm font-bold flex items-center gap-2 ${getPaymentStatusColor(
                            order.payment?.status
                          )}`}
                        >
                          <CheckCircle className="w-4 h-4" />
                          {order.payment?.status?.toUpperCase() || "NOT PAID"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-rose-50 to-amber-50 p-6 rounded-xl border border-rose-200">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-rose-100 rounded-lg">
                        <MapPin className="w-5 h-5 text-rose-600" />
                      </div>
                      <h3 className="font-bold text-rose-900 text-lg">
                        Delivery Address
                      </h3>
                    </div>
                    <div className="text-sm text-rose-700 space-y-1">
                      <p className="font-semibold text-rose-900">
                        {order.deliveryAddress?.fullName}
                      </p>
                      <p>{order.deliveryAddress?.addressLine1}</p>
                      {order.deliveryAddress?.addressLine2 && (
                        <p>{order.deliveryAddress.addressLine2}</p>
                      )}
                      <p className="font-medium">
                        {order.deliveryAddress?.city},{" "}
                        {order.deliveryAddress?.state}{" "}
                        {order.deliveryAddress?.postalCode}
                      </p>
                      <p>{order.deliveryAddress?.country}</p>
                      {order.deliveryAddress?.phone && (
                        <p className="flex items-center gap-2 mt-2 text-rose-700">
                          <Phone className="w-4 h-4" />
                          {order.deliveryAddress.phone}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-xl border border-amber-200">
                  <h3 className="font-bold text-amber-900 text-xl mb-6 flex items-center gap-3">
                    <div className="p-2 bg-amber-100 rounded-lg">
                      <Package className="w-6 h-6 text-amber-600" />
                    </div>
                    Order Items ({order.items?.length || 0})
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {order.items?.map((item, index) => (
                      <div
                        key={index}
                        className="bg-white p-6 rounded-xl border border-amber-200 shadow-sm hover:shadow-md transition-shadow"
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex-1">
                            <h4 className="font-bold text-amber-900 text-lg mb-3">
                              {item.name}
                            </h4>
                            <div className="grid grid-cols-2 gap-3 text-sm">
                              <div>
                                <span className="text-amber-700 font-medium">
                                  Size:
                                </span>
                                <span className="ml-2 font-semibold text-amber-900">
                                  {item.size}
                                </span>
                              </div>
                              <div>
                                <span className="text-amber-700 font-medium">
                                  Qty:
                                </span>
                                <span className="ml-2 font-semibold text-amber-900">
                                  {item.quantity}
                                </span>
                              </div>
                              <div className="col-span-2 flex items-center gap-2">
                                <span className="text-amber-700 font-medium">
                                  Color:
                                </span>
                                <div
                                  className="w-6 h-6 rounded-full border-2 border-amber-300 shadow-sm"
                                  style={{ backgroundColor: item.color }}
                                ></div>
                              </div>
                            </div>
                          </div>
                          <div className="text-right ml-4">
                            <p className="text-sm text-amber-700 font-medium">
                              Price
                            </p>
                            <p className="text-xl font-bold text-amber-900 flex items-center gap-1">
                              <IndianRupee className="w-4 h-4" />
                              {item.price?.toLocaleString("en-IN")}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {order.orderStatus === "cancelled" &&
                  order.cancellationNote && (
                    <div className="mt-6 bg-rose-100 border border-rose-300 text-rose-800 rounded-lg p-4 shadow-inner">
                      <h2 className="font-bold text-rose-700 text-lg mb-2 flex items-center gap-2">
                        <XCircle className="w-5 h-5" />
                        Order Cancelled
                      </h2>
                      <p className="text-sm leading-relaxed mb-2">
                        {order.cancellationNote}
                      </p>
                      <p className="text-sm text-rose-700">
                        Your amount will be refunded within{" "}
                        <span className="font-semibold">3–5 business days</span>
                        . We’re sorry for the inconvenience caused.
                      </p>
                    </div>
                  )}

                <div className="mt-8 bg-gradient-to-r from-amber-500 to-orange-500 p-6 rounded-xl text-white">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-amber-100 text-sm font-medium">
                        Total Order Amount
                      </p>
                      <p className="text-sm text-amber-200 mt-1">
                        Including all taxes and charges
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-bold flex items-center gap-2">
                        <IndianRupee className="w-6 h-6" />
                        {order.totalAmount?.toLocaleString("en-IN")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
