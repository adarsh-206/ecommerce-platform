"use client";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";

export default function CartIcon({ count }) {
  return (
    <Link
      href="/cart"
      className="relative inline-flex items-center justify-center h-10 w-10 rounded-full bg-indigo-50 hover:bg-indigo-100 text-indigo-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      aria-label={`Shopping cart with ${count || 0} items`}
    >
      <ShoppingCart size={20} />

      {count > 0 && (
        <span className="absolute -top-1 -right-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-medium rounded-full h-5 w-5 flex items-center justify-center transform transition-transform duration-200 hover:scale-110">
          {count > 99 ? "99+" : count}
        </span>
      )}

      <span className="sr-only">View your shopping cart</span>
    </Link>
  );
}
