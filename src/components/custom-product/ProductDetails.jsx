// components/custom-product/ProductDetails.js
"use client";
import { Calendar, Star } from "lucide-react";

const ProductDetails = ({ product, quoteRequest, priceData }) => (
  <div>
    <h1 className="text-3xl font-bold text-amber-800 mb-4">{product.name}</h1>
    <p className="text-amber-600 mb-4">
      {product.description?.long ||
        product.description?.short ||
        "Custom product created specially for you"}
    </p>

    <div className="flex items-center space-x-4 mb-4">
      <div className="flex items-center">
        {[0, 1, 2, 3, 4].map((rating) => (
          <Star key={rating} className="h-5 w-5 text-amber-400 fill-current" />
        ))}
        <span className="ml-2 text-amber-600 font-medium">5.0</span>
      </div>
      <span className="text-amber-600">(Custom Product)</span>
    </div>

    {priceData && (
      <div className="flex items-baseline space-x-3 mb-6">
        <span className="text-3xl font-bold text-amber-800">
          ₹{priceData.sellingPrice?.toLocaleString("en-IN")}
        </span>
        {priceData.originalPrice > priceData.sellingPrice && (
          <span className="text-xl text-gray-500 line-through">
            ₹{priceData.originalPrice.toLocaleString("en-IN")}
          </span>
        )}
        {priceData.discountPercentage > 0 && (
          <span className="text-green-600 font-semibold text-lg">
            ({Math.round(priceData.discountPercentage)}% OFF)
          </span>
        )}
      </div>
    )}

    <div className="flex items-center text-amber-600">
      <Calendar className="h-4 w-4 mr-2" />
      <span className="text-sm">
        Created: {new Date(quoteRequest.createdAt).toLocaleDateString("en-GB")}
      </span>
    </div>
  </div>
);

export default ProductDetails;
