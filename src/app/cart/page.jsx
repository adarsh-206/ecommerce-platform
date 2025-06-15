"use client";

import MainLayout from "@/components/layouts/MainLayout";
import { useCart } from "@/context/CartContext";
import { Trash2, Plus, Minus, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import COLOR_NAMES from "@/constants/color";

export default function CartPage() {
  const { cartItems, updateItem } = useCart();

  const handleQuantityChange = (item, newQuantity) => {
    if (newQuantity < 1) return;
    updateItem(item.product._id, item.size, item.color, newQuantity);
  };

  const handleRemoveItem = (item) => {
    updateItem(item.product._id, item.size, item.color, 0);
  };

  // Total price (actual price paid)
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.totalPrice * item.quantity,
    0
  );

  // Total original price (before discount)
  const totalOriginalPrice = cartItems.reduce(
    (sum, item) => sum + item.product.originalPrice * item.quantity,
    0
  );

  const totalSaved = totalOriginalPrice - totalPrice;

  if (cartItems.length === 0) {
    return (
      <MainLayout>
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 flex flex-col items-center justify-center">
          <ShoppingCart className="h-24 w-24 text-amber-600 animate-pulse mb-4" />
          <p className="text-lg text-amber-800 font-semibold">
            Your cart is empty
          </p>
          <Link
            href="/"
            className="mt-4 px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-all duration-300"
          >
            Continue Shopping
          </Link>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 p-12">
        <h1 className="text-2xl font-bold text-amber-800 mb-6">Your Cart</h1>

        <div className="max-w-full mx-auto bg-white rounded-lg shadow-lg p-6">
          {cartItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between border-b border-amber-100 py-4"
            >
              <div className="flex items-center space-x-4">
                <div className="w-24 h-24 rounded-lg overflow-hidden bg-amber-50 border border-amber-200">
                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    width={96}
                    height={96}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div>
                  <h2 className="font-semibold text-amber-800">
                    {item.product.name}
                  </h2>

                  <p className="text-sm text-amber-600 flex items-center gap-2">
                    Size: {item.size} | Color:{" "}
                    {COLOR_NAMES[item.color] ? (
                      COLOR_NAMES[item.color]
                    ) : (
                      <span
                        className="w-5 h-5 rounded-full border border-amber-300 inline-block"
                        style={{ backgroundColor: item.color }}
                      ></span>
                    )}
                  </p>

                  <p className="text-sm text-amber-700 font-semibold">
                    ₹ {item.totalPrice}
                    <span className="line-through text-sm text-amber-400 ml-2">
                      ₹ {item.product.originalPrice}
                    </span>
                    <span className="ml-2 text-green-600 font-semibold">
                      {parseInt(item.product.discount)}% OFF
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleQuantityChange(item, item.quantity - 1)}
                  className="p-2 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-700"
                >
                  <Minus size={16} />
                </button>

                <span className="font-semibold text-amber-800">
                  {item.quantity}
                </span>

                <button
                  onClick={() => handleQuantityChange(item, item.quantity + 1)}
                  className="p-2 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-700"
                >
                  <Plus size={16} />
                </button>

                <button
                  onClick={() => handleRemoveItem(item)}
                  className="ml-4 p-2 rounded-full bg-rose-100 hover:bg-rose-200 text-rose-700"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}

          <div className="flex justify-between items-center mt-6">
            <div>
              <p className="text-lg font-semibold text-amber-800">
                Total: ₹ {totalPrice.toFixed(2)}
              </p>
              <p className="text-sm text-green-600 font-semibold">
                You Saved: ₹ {totalSaved.toFixed(2)}
              </p>
            </div>

            <button className="px-6 py-3 bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 text-white font-bold rounded-lg shadow-md hover:scale-105 transition-all duration-300">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
