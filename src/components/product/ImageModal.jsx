"use client";
import React from "react";

const ImageModal = ({
  isOpen,
  images,
  currentIndex,
  onClose,
  onPrev,
  onNext,
  onSelectIndex,
  productName,
}) => {
  if (!isOpen || images.length === 0) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
      <div className="relative max-w-7xl max-h-full p-4">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 m-3 right-4 z-10 bg-white text-gray-700 hover:bg-orange-400 hover:text-white transition-all duration-300 rounded-full shadow-lg p-2"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Image Display */}
        <div className="relative">
          <img
            src={images[currentIndex]?.url}
            alt={`${productName} ${currentIndex + 1}`}
            className="max-w-full max-h-[90vh] object-contain mx-auto rounded-lg"
            style={{ maxWidth: "90vw" }}
          />

          {/* Prev / Next Buttons */}
          {images.length > 1 && (
            <>
              <button
                onClick={onPrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-amber-300 transition-colors duration-200 bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full p-2"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              <button
                onClick={onNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-amber-300 transition-colors duration-200 bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full p-2"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </>
          )}

          {/* Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white bg-black bg-opacity-50 px-3 py-1 rounded-full text-sm">
            {currentIndex + 1} / {images.length}
          </div>
        </div>
      </div>

      {/* Dots Navigation */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => onSelectIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                currentIndex === index
                  ? "bg-amber-400"
                  : "bg-white bg-opacity-50 hover:bg-opacity-70"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageModal;
