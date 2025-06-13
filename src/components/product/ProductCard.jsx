"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import categories from "@/constants/categories";

export default function ProductCard({ product }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const cardRef = useRef(null);
  const [cardHeight, setCardHeight] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (cardRef.current) {
      setCardHeight(cardRef.current.offsetHeight);
    }
  }, []);

  const productLink = product?.id ? `/product/${product.id}` : "#";
  const categoryObj = categories.find((cat) => cat.id == product.category);
  const categoryName = categoryObj?.name || "";
  const subCategoryObj = categoryObj?.subcategories?.find(
    (sub) => sub.id == product.subCategory
  );
  const subCategoryName = subCategoryObj?.name || "";

  return (
    <div
      ref={cardRef}
      className="group relative bg-gradient-to-br from-white via-amber-50 to-orange-50 rounded-xl shadow-lg overflow-hidden border border-amber-200 hover:shadow-2xl transition-all duration-500 hover:scale-105 flex flex-col h-full"
      onMouseEnter={() => isDesktop && setIsHovered(true)}
      onMouseLeave={() => isDesktop && setIsHovered(false)}
      style={{ minHeight: cardHeight }}
    >
      <Link href={productLink} className="block">
        <div className="relative h-64 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className={`w-full h-full object-cover transform transition-transform duration-500 ${
              isHovered ? "scale-105" : ""
            }`}
          />
          {isHovered && (
            <div className="absolute inset-0 bg-gradient-to-t from-amber-900/40 via-orange-800/20 to-transparent flex justify-center items-center">
              <span className="bg-gradient-to-r from-amber-600 to-orange-600 text-white py-3 px-6 rounded-full font-semibold shadow-lg transform transition-all duration-300 hover:scale-105">
                Quick View
              </span>
            </div>
          )}
        </div>
      </Link>

      <div className="p-5 flex flex-col flex-grow">
        <div className="flex flex-wrap gap-2 mb-2">
          {categoryName && (
            <span className="self-start text-xs font-medium text-amber-700 bg-amber-100 px-3 py-1 rounded-full">
              {categoryName}
            </span>
          )}
          {subCategoryName && (
            <span className="self-start text-xs font-medium text-orange-700 bg-orange-100 px-3 py-1 rounded-full">
              {subCategoryName}
            </span>
          )}
        </div>

        <Link href={productLink} className="block flex-grow">
          <h3 className="text-lg font-semibold text-amber-800 mt-1 hover:text-orange-700 transition-colors duration-300 line-clamp-2 min-h-[56px]">
            {product.name}
          </h3>
        </Link>

        <div className="mt-3 flex items-center">
          {[0, 1, 2, 3, 4].map((rating) => (
            <svg
              key={rating}
              className={`h-4 w-4 ${
                product.rating > rating ? "text-amber-400" : "text-amber-200"
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
          <span className="ml-2 text-sm text-amber-600 font-medium">
            {product.rating}
          </span>
        </div>

        <div className="mt-4 flex justify-between items-center">
          <p className="text-xl font-bold text-amber-800">
            ₹{product.price.toFixed(2)}
          </p>
          <button
            className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-amber-200"
            aria-label={`Add ${product.name} to cart`}
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
        </div>
      </div>
    </div>
  );
}
