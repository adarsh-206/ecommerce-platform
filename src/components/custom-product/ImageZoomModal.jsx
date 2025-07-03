// components/custom-product/ImageZoomModal.js
"use client";
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

const ImageZoomModal = ({
  isOpen,
  onClose,
  images,
  startIndex = 0,
  productName,
}) => {
  const [currentIndex, setCurrentIndex] = useState(startIndex);

  // Effect to handle keyboard navigation and body scroll
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") {
        nextImage();
      } else if (e.key === "ArrowLeft") {
        prevImage();
      } else if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden"; // Prevent background scroll

    // Set the starting index when the modal opens
    setCurrentIndex(startIndex);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset"; // Restore scroll
    };
  }, [isOpen, startIndex]);

  if (!isOpen || !images || images.length === 0) {
    return null;
  }

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 transition-opacity duration-300"
      onClick={onClose} // Close modal on backdrop click
    >
      <div
        className="relative max-w-4xl max-h-[90vh] w-full h-full flex items-center justify-center p-4"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on the image/controls
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gray-300 z-20 bg-black bg-opacity-50 rounded-full p-2"
          aria-label="Close image viewer"
        >
          <X className="h-8 w-8" />
        </button>

        {/* Previous Image Button */}
        {images.length > 1 && (
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-20 bg-black bg-opacity-50 rounded-full p-2"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-8 w-8" />
          </button>
        )}

        {/* Next Image Button */}
        {images.length > 1 && (
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-20 bg-black bg-opacity-50 rounded-full p-2"
            aria-label="Next image"
          >
            <ChevronRight className="h-8 w-8" />
          </button>
        )}

        {/* Image Display */}
        <img
          src={images[currentIndex]?.url}
          alt={`${productName} view ${currentIndex + 1}`}
          className="max-w-full max-h-full object-contain rounded-lg"
        />

        {/* Image Counter */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm bg-black bg-opacity-50 px-3 py-1 rounded-full">
            {currentIndex + 1} / {images.length}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageZoomModal;
