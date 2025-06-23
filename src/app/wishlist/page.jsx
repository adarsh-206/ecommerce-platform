"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import MainLayout from "@/components/layouts/MainLayout";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { showToast } from "@/utils/showToast";
import { Heart, X } from "lucide-react";

export default function WishlistPage() {
  const { wishlist, fetchWishlist, removeFromWishlist } = useWishlist();
  const { addItem, getItemQuantity } = useCart();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWishlist().finally(() => setLoading(false));
  }, []);

  const SkeletonCard = () => (
    <div className="animate-pulse bg-white border border-amber-200 rounded-xl shadow p-4 space-y-4">
      <div className="h-64 bg-amber-100 rounded-md" />
      <div className="h-4 bg-amber-100 rounded w-3/4" />
      <div className="h-4 bg-amber-100 rounded w-1/2" />
      <div className="h-10 bg-amber-100 rounded w-full" />
    </div>
  );

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 p-4 sm:p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-bold text-amber-800 mb-6">
            My Wishlist
          </h1>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : wishlist.length === 0 ? (
            <div className="text-center text-amber-700 font-medium">
              <Heart className="mx-auto mb-2 w-8 h-8 text-amber-600" />
              Your wishlist is empty.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlist.map((item) => {
                const quantity = getItemQuantity(
                  item.id,
                  item.defaultSize,
                  item.defaultColor
                );

                return (
                  <div
                    key={item.id}
                    className="group relative bg-gradient-to-br from-white via-amber-50 to-orange-50 rounded-xl shadow-lg overflow-hidden border border-amber-200 hover:shadow-2xl transition-all duration-500 hover:scale-105 flex flex-col h-full"
                  >
                    <Link href={`/product/${item.id}`} className="block">
                      <div className="relative h-64 overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    </Link>

                    <div className="p-5 flex flex-col flex-grow">
                      <Link
                        href={`/product/${item.id}`}
                        className="block flex-grow"
                      >
                        <h3 className="text-lg font-semibold text-amber-800 mt-1 hover:text-orange-700 transition-colors duration-300 line-clamp-2 min-h-[56px]">
                          {item.name}
                        </h3>
                      </Link>

                      <div className="mt-4 flex justify-between items-center">
                        <p className="text-xl font-bold text-amber-800">
                          ₹{item.price.toFixed(2)}
                        </p>
                        {quantity > 0 ? (
                          <span className="text-sm text-green-600 font-medium">
                            In Cart
                          </span>
                        ) : (
                          <button
                            onClick={async () => {
                              try {
                                await addItem(
                                  item.id,
                                  item.defaultSize,
                                  item.defaultColor
                                );
                                showToast.success("Added to cart");
                              } catch {
                                showToast.error("Failed to add to cart");
                              }
                            }}
                            className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-amber-200"
                            aria-label={`Add ${item.name} to cart`}
                          >
                            <svg
                              className="h-5 w-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                              />
                            </svg>
                          </button>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => removeFromWishlist(item.id)}
                      className="absolute top-2 right-2 bg-white border border-amber-300 text-rose-600 hover:text-white hover:bg-rose-500 p-1 rounded-full shadow-sm transition-colors duration-300"
                      aria-label="Remove from wishlist"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
