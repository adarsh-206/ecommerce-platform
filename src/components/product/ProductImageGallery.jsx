"use client";

import React from "react";
import Image from "next/image";

const ProductImageGallery = ({
  images = [],
  selectedImage = 0,
  handleImageSelect = () => {},
  handleMouseMove = () => {},
  handleMouseEnter = () => {},
  handleMouseLeave = () => {},
  openModal = () => {},
  zoomStyle = {},
  isZooming = false,
  priceData = {},
  product = {},
  containerRef = null,
  imageRef = null,
}) => {
  return (
    <div className="space-y-4">
      {images.length > 0 && (
        <div
          ref={containerRef}
          className="relative bg-white rounded-2xl shadow-lg overflow-hidden border border-amber-200 cursor-zoom-in"
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={() => openModal(selectedImage)}
        >
          <Image
            ref={imageRef}
            src={images[selectedImage]?.url}
            alt={product?.name || "Product Image"}
            width={800}
            height={600}
            className={`w-full h-96 object-cover transition-transform duration-300 ease-out ${
              isZooming ? "cursor-zoom-out" : "cursor-zoom-in"
            }`}
            style={isZooming ? zoomStyle : {}}
          />

          {priceData?.discountPercentage > 0 && (
            <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold pointer-events-none">
              {Math.round(priceData.discountPercentage)}% OFF
            </div>
          )}

          {product?.featured && (
            <div className="absolute top-4 right-4 bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold pointer-events-none">
              {product?.featured}
            </div>
          )}
        </div>
      )}

      {images.length > 1 && (
        <div className="flex space-x-3 overflow-x-auto">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => handleImageSelect(index)}
              className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 relative ${
                selectedImage === index
                  ? "border-amber-500 shadow-lg scale-105"
                  : "border-amber-200 hover:border-amber-400"
              }`}
            >
              <Image
                src={image.url}
                alt={`Thumbnail ${index + 1}`}
                width={80}
                height={80}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductImageGallery;
