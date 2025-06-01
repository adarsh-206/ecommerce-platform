"use client";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";

export default function CartIcon({ count }) {
  return (
    <Link
      href="/cart"
      className="relative inline-flex items-center justify-center h-10 w-10 rounded-full bg-amber-100/60 hover:bg-amber-200/60 text-amber-700 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-amber-400"
      aria-label={`Shopping cart with ${count || 0} items`}
    >
      <ShoppingCart size={20} />

      {count > 0 && (
        <span className="absolute -top-1 -right-1 bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center transform transition-transform duration-200 hover:scale-110 shadow-md">
          {count > 99 ? "99+" : count}
        </span>
      )}

      <span className="sr-only">View your shopping cart</span>
    </Link>
  );
}
