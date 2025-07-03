// components/custom-product/ProductImageGallery.js
"use client";
import React, { useState, useRef } from "react";
import { ZoomIn } from "lucide-react";

const ProductImageGallery = ({
  images,
  product,
  selectedImage,
  onImageSelect,
  onImageClick,
}) => {
  const [zoomStyle, setZoomStyle] = useState({});
  const [isZooming, setIsZooming] = useState(false);
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const { left, top, width, height } =
      containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomStyle({ transformOrigin: `${x}% ${y}%`, transform: "scale(2)" });
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-amber-200">
      <div
        ref={containerRef}
        className="relative mb-4 overflow-hidden rounded-xl bg-amber-50 group cursor-zoom-in"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsZooming(true)}
        onMouseLeave={() => setIsZooming(false)}
        onClick={onImageClick}
      >
        <img
          src={images[selectedImage]?.url}
          alt={product.name}
          className={`w-full h-96 object-cover transition-transform duration-300 ${
            isZooming ? "scale-110" : ""
          }`}
          style={isZooming ? zoomStyle : {}}
        />
        <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
          <ZoomIn className="h-5 w-5" />
        </div>
      </div>
      <div className="grid grid-cols-4 gap-3">
        {images.map((image, index) => (
          <button
            key={image.url + index}
            onClick={() => onImageSelect(index)}
            className={`relative rounded-lg overflow-hidden border-2 transition-all duration-300 ${
              selectedImage === index
                ? "border-amber-500 shadow-md"
                : "border-amber-200 hover:border-amber-400"
            }`}
          >
            <img
              src={image.url}
              alt={`${product.name} view ${index + 1}`}
              className="w-full h-20 object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductImageGallery;
