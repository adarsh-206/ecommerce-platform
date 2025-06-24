"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import MainLayout from "@/components/layouts/MainLayout";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { showToast } from "@/utils/showToast";
import { Heart, X } from "lucide-react";
import ProductCard from "@/components/product/ProductCard";

export default function WishlistPage() {
  const { wishlist = [], fetchWishlist } = useWishlist();
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

  const isEmpty =
    !loading && (!Array.isArray(wishlist) || wishlist.length === 0);

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 p-4 sm:p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-bold text-amber-800 mb-6 flex items-center gap-3">
            <Heart className="w-6 h-6 text-amber-600" />
            My Wishlist
          </h1>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : isEmpty ? (
            <div className="flex flex-col items-center justify-center text-amber-700 font-medium py-16">
              <Heart className="w-10 h-10 text-amber-600 mb-4" />
              <p className="text-lg">Your wishlist is empty.</p>
              <Link
                href="/"
                className="mt-6 inline-block bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold py-2 px-6 rounded-full shadow-md transition-transform hover:scale-105"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlist.map((rawProduct, index) => {
                if (!rawProduct || typeof rawProduct !== "object") return null;

                const product = {
                  id: rawProduct?.id ?? `no-id-${index}`,
                  name: rawProduct?.name ?? "Unnamed Product",
                  image: rawProduct?.image ?? "",
                  price:
                    typeof rawProduct?.price === "number"
                      ? rawProduct.price
                      : 0,
                  rating:
                    typeof rawProduct?.rating === "number"
                      ? rawProduct.rating
                      : 0,
                  category: rawProduct?.category ?? "Uncategorized",
                  subCategory: rawProduct?.subCategory ?? null,
                  priceBySize: Array.isArray(rawProduct?.priceBySize)
                    ? rawProduct.priceBySize
                    : [],
                  availableColors: Array.isArray(rawProduct?.availableColors)
                    ? rawProduct.availableColors
                    : [],
                };

                return <ProductCard key={product.id} product={product} />;
              })}
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
