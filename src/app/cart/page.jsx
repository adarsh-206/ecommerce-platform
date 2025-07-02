"use client";

import MainLayout from "@/components/layouts/MainLayout";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { Trash2, Plus, Minus, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import COLOR_NAMES from "@/constants/color";
import { showToast } from "@/utils/showToast";

export const cartMetadata = {
  title: "Shopping Cart | Chaka-Chak - Review Your Selected Items",
  description:
    "Review your selected items in your Chaka-Chak shopping cart and get ready to complete your purchase of amazing quirky fashion pieces and unique lifestyle products. Your cart is where all your carefully chosen items come together, giving you a final opportunity to review your selections, adjust quantities, apply discount codes, and calculate your total before proceeding to checkout. We've designed our cart experience to be intuitive and informative, providing you with all the details you need to make confident purchasing decisions. Each item in your cart displays clear product information including images, descriptions, sizes, colors, individual pricing, and availability status. You can easily modify quantities, remove items you've changed your mind about, or save items to your wishlist for future consideration. Our cart also provides real-time updates on shipping costs, estimated delivery dates, and any applicable taxes or fees, ensuring complete transparency in your purchase process. We understand that sometimes you need time to think about your purchases, so items in your cart are temporarily held for you, giving you the flexibility to step away and return later to complete your order. Our secure cart system protects your information and ensures that your selected items remain available while you're browsing or considering additional purchases. Take advantage of our suggested products feature that shows complementary items other customers have purchased together, helping you create complete looks or discover new favorites you might have missed during your initial browsing session.",
  keywords:
    "chaka chak cart, shopping cart, review items, checkout, purchase process",
  icons: {
    icon: "/chaka-chak-logo.ico",
    apple: "/chaka-chak-logo.png",
  },
};

export default function CartPage() {
  const { cartItems, updateItem } = useCart();

  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const handleQuantityChange = (item, newQuantity) => {
    if (newQuantity < 1) {
      updateItem(item.product._id, item.size, item.color, 0);
      showToast.custom("Item removed from your cart");
    } else {
      updateItem(item.product._id, item.size, item.color, newQuantity);
      showToast.custom("Cart updated successfully");
    }
  };

  const handleRemoveItem = (item) => {
    updateItem(item.product._id, item.size, item.color, 0);
    showToast.custom("Item removed from your cart");
  };

  const handleCheckout = () => {
    if (isAuthenticated) {
      router.push("/checkout");
    } else {
      router.push("/buyer/login?redirect=/checkout");
    }
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const totalOriginalPrice = cartItems.reduce(
    (sum, item) => sum + item.originalPrice * item.quantity,
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
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 p-4 sm:p-12">
        <h1 className="text-2xl font-bold text-amber-800 mb-6">Your Cart</h1>

        <div className="max-w-full mx-auto bg-white rounded-lg shadow-lg p-4 sm:p-3">
          {cartItems.map((item, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-amber-100 py-4 gap-4"
            >
              <div className="flex items-start gap-4">
                <div className="w-24 h-24 rounded-lg overflow-hidden bg-amber-50 border border-amber-200 flex-shrink-0">
                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    width={96}
                    height={96}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div>
                  <h2 className="font-semibold text-amber-800 text-sm sm:text-base">
                    {item.product.name}
                  </h2>
                  <p className="text-xs sm:text-sm text-amber-600 flex items-center gap-2 mt-1">
                    Size: {item.size} | Color:{" "}
                    {COLOR_NAMES[item.color] ? (
                      COLOR_NAMES[item.color]
                    ) : (
                      <span
                        className="w-4 h-4 rounded-full border border-amber-300 inline-block"
                        style={{ backgroundColor: item.color }}
                      ></span>
                    )}
                  </p>
                  <p className="text-sm text-amber-700 font-semibold mt-1">
                    ₹ {item.price}
                    <span className="line-through text-sm text-amber-400 ml-2">
                      ₹ {item.originalPrice}
                    </span>
                    <span className="ml-2 text-green-600 font-semibold">
                      {parseInt(item.discount)}% OFF
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
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
                  className="p-2 rounded-full bg-rose-100 hover:bg-rose-200 text-rose-700 ml-2"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-6 gap-4">
            <div>
              <p className="text-lg font-semibold text-amber-800">
                Total: ₹ {totalPrice.toFixed(2)}
              </p>
              <p className="text-sm text-green-600 font-semibold">
                You Saved: ₹ {totalSaved.toFixed(2)}
              </p>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 text-white font-bold rounded-lg shadow-md hover:scale-105 transition-all duration-300"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
