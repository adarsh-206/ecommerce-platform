"use client";

import Link from "next/link";
import { ShoppingBag, ShoppingCart } from "lucide-react";
import BrandLogo from "@/components/common/BrandLogo";
import MainLayout from "@/components/layouts/MainLayout";

export default function StartSellingComingSoon() {
  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-r from-amber-50 via-orange-50 to-rose-50 flex items-center justify-center px-4 py-10 sm:py-16 md:py-20 lg:py-24">
        <div className="max-w-2xl w-full text-center">
          <div className="flex justify-center mb-8">
            <div className="p-5 sm:p-6 md:p-8 bg-gradient-to-tr from-amber-300 via-orange-300 to-rose-300 rounded-full shadow-lg animate-bounce">
              <ShoppingBag className="h-14 w-14 sm:h-16 sm:w-16 md:h-20 md:w-20 text-white drop-shadow-xl" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-amber-700 mb-5 leading-tight">
            Start Selling - Coming Soon!
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-amber-800 mb-4 px-2 sm:px-0">
            We are actively building the seller experience. Soon you'll be able
            to showcase your products, manage orders, and grow your business
            with us.
          </p>
          <p className="text-base sm:text-lg md:text-xl text-orange-600 font-semibold mb-8 px-2 sm:px-0">
            Till then, explore amazing products and enjoy shopping with us!
          </p>

          <Link href="/">
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white text-lg font-semibold rounded-xl shadow-xl transform transition-all duration-300 hover:scale-110">
              <ShoppingCart className="h-6 w-6 mr-3" />
              Continue Shopping
            </div>
          </Link>
        </div>
      </div>
    </MainLayout>
  );
}
