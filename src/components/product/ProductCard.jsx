"use client";

import Link from "next/link";
import { useState } from "react";

export default function ProductCard({ product }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative bg-white rounded-lg shadow-sm overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={product.href} className="block">
        <div className="relative h-64 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-105"
          />
          {isHovered && (
            <div className="absolute inset-0 bg-black bg-opacity-20 flex justify-center items-center">
              <span className="bg-indigo-600 text-white py-2 px-4 rounded-md font-medium">
                Quick View
              </span>
            </div>
          )}
        </div>
      </Link>

      <div className="p-4">
        <span className="text-sm text-gray-500">{product.category}</span>
        <Link href={product.href} className="block">
          <h3 className="text-lg font-medium text-gray-900 mt-1 hover:text-indigo-600">
            {product.name}
          </h3>
        </Link>

        <div className="mt-1 flex items-center">
          {[0, 1, 2, 3, 4].map((rating) => (
            <svg
              key={rating}
              className={`h-4 w-4 ${
                product.rating > rating ? "text-yellow-400" : "text-gray-300"
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>

        <div className="mt-2 flex justify-between items-center">
          <p className="text-lg font-medium text-gray-900">
            ₹{product.price.toFixed(2)}
          </p>
          <button
            className="text-indigo-600 hover:text-indigo-500 focus:outline-none"
            aria-label={`Add ${product.name} to cart`}
          >
            <svg
              className="h-6 w-6"
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
        </div>
      </div>
    </div>
  );
}
