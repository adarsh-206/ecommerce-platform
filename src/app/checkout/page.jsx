"use client";

import MainLayout from "@/components/layouts/MainLayout";
import DeliveryAddresses from "@/components/deliveryAdresses/DeliveryAddresses";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Truck, Shield, CreditCard } from "lucide-react";
import COLOR_NAMES from "@/constants/color";
import { showToast } from "@/utils/showToast";
import apiService from "../utils/apiService";

export default function CheckoutPage() {
  const { cartItems, clearCart } = useCart();
  const { user } = useAuth();
  const router = useRouter();

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const totalOriginalPrice = cartItems.reduce(
    (sum, item) => sum + item.originalPrice * item.quantity,
    0
  );
  const totalSaved = totalOriginalPrice - totalPrice;
  const deliveryFee = totalPrice > 500 ? 0 : 0;
  const finalTotal = totalPrice + deliveryFee;

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleProceedToPay = async () => {
    if (!selectedAddress) {
      showToast.error("Please select a delivery address");
      return;
    }

    setIsProcessing(true);

    const razorpayLoaded = await loadRazorpayScript();
    if (!razorpayLoaded) {
      showToast.error("Failed to load Razorpay. Please try again.");
      setIsProcessing(false);
      return;
    }

    try {
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: finalTotal * 100,
        currency: "INR",
        name: "Chaka-Chak",
        description: "Order Payment",
        handler: async function (response) {
          try {
            const orderPayload = {
              user: user._id,
              items: cartItems.map((item) => ({
                product: item.product._id,
                size: item.size,
                color: item.color,
                quantity: item.quantity,
                priceAtPurchase: item.price,
              })),
              totalAmount: finalTotal,
              deliveryAddress: selectedAddress?._id,
              payment: {
                method: "razorpay",
                transactionId: response.razorpay_payment_id,
                paymentStatus: "paid",
              },
            };

            const res = await apiService.post("/order/", orderPayload, true);

            if (res.status) {
              showToast.success("Payment successful! Order placed.");
              clearCart();
              router.push("/orders");
            } else {
              showToast.error(
                "Payment succeeded but failed to place order. Contact support."
              );
            }
          } catch (err) {
            console.error("Order placement failed:", err);
            showToast.error("Payment succeeded but order placement failed.");
          }
        },
        prefill: {
          name: user?.name || "Chaka-Chak Admin",
          email: user?.email || "chakachakteam@gmail.com",
          contact: user?.phone || "+91 9876543210",
        },
        theme: {
          color: "#D97706",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", function () {
        showToast.error("Payment failed. Please try again.");
      });
      rzp.open();
    } catch (error) {
      console.log("Payment initiation error:", error);
      showToast.error("Failed to initiate payment. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleAddressSelect = (addressId) => {
    setSelectedAddress(addressId);
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 p-4 sm:p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-bold text-amber-800 mb-6">
            Checkout
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold text-amber-800 flex items-center gap-2 mb-4">
                  <Truck className="h-5 w-5" />
                  Order Summary
                </h2>

                <div className="space-y-4">
                  {cartItems.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 p-3 bg-amber-50 rounded-lg"
                    >
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-white border border-amber-200 flex-shrink-0">
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          width={64}
                          height={64}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-amber-800 text-sm">
                          {item.product.name}
                        </h3>
                        <p className="text-xs text-amber-600 mt-1">
                          Size: {item.size} | Color:{" "}
                          {COLOR_NAMES[item.color] || item.color} | Qty:{" "}
                          {item.quantity}
                        </p>
                        <p className="text-sm text-amber-700 font-semibold mt-1">
                          ₹{item.price} × {item.quantity} = ₹
                          {(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <DeliveryAddresses
                selectedAddress={selectedAddress}
                onAddressSelect={handleAddressSelect}
              />
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-lg p-6 sticky top-4">
                <h2 className="text-xl font-semibold text-amber-800 mb-4">
                  Price Details
                </h2>

                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-amber-700">
                    <span>Price ({cartItems.length} items)</span>
                    <span>₹{totalOriginalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-₹{totalSaved.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-amber-700">
                    <span>Delivery Charges</span>
                    <span className={deliveryFee === 0 ? "text-green-600" : ""}>
                      {deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
                    </span>
                  </div>
                  <hr className="border-amber-200" />
                  <div className="flex justify-between text-lg font-bold text-amber-800">
                    <span>Total Amount</span>
                    <span>₹{finalTotal.toFixed(2)}</span>
                  </div>
                </div>

                <div className="bg-green-50 p-3 rounded-lg mb-4">
                  <p className="text-sm text-green-700 font-semibold">
                    You will save ₹{totalSaved.toFixed(2)} on this order
                  </p>
                </div>

                <div className="flex items-center gap-2 text-sm text-amber-600 mb-4">
                  <Shield className="h-4 w-4" />
                  <span>
                    Safe and Secure Payments. Easy returns. 100% Authentic
                    products.
                  </span>
                </div>

                <button
                  onClick={handleProceedToPay}
                  disabled={isProcessing || !selectedAddress}
                  className={`w-full py-3 px-6 rounded-lg font-bold text-white transition-all duration-300 ${
                    isProcessing || !selectedAddress
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 hover:scale-105 shadow-lg"
                  }`}
                >
                  {isProcessing ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Processing...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <CreditCard className="h-5 w-5" />
                      {!selectedAddress
                        ? "Select Address to Continue"
                        : "Proceed to Pay"}
                    </div>
                  )}
                </button>

                <p className="text-xs text-amber-600 text-center mt-3">
                  By proceeding to pay, you agree to our Terms & Conditions
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
    </MainLayout>
  );
}
