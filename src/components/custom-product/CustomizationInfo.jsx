// components/custom-product/CustomizationInfo.js
"use client";
import React from "react";

const CustomizationInfo = ({
  customization,
  product,
  selectedPriceData,
  sellerName,
}) => {
  const { quoteRequest, status } = customization;

  const statusStyles = {
    pending: "bg-yellow-100 text-yellow-800",
    approved: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
  };

  return (
    <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* Product Description Card */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-amber-200">
        <h2 className="text-2xl font-bold text-amber-800 mb-6">
          Product Description
        </h2>
        <p className="text-amber-700 leading-relaxed mb-4">
          {product.description?.long ||
            product.description?.short ||
            "This is a custom product created specifically based on your requirements. It has been designed and prepared by our skilled sellers to meet your exact specifications."}
        </p>
        {product.tags && product.tags.length > 0 && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-amber-800 mb-2">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Customization Details Card */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-amber-200">
        <h2 className="text-2xl font-bold text-amber-800 mb-6">
          Customization Details
        </h2>
        <div className="space-y-4">
          <DetailRow label="Seller" value={sellerName || "N/A"} />
          <DetailRow
            label="Original Request"
            value={quoteRequest.productType}
          />
          <DetailRow
            label="Requested Sizes"
            value={quoteRequest.sizes.join(", ")}
          />
          <DetailRow label="Status">
            <span
              className={`px-2 py-1 rounded-full text-xs font-semibold ${statusStyles[status]}`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
          </DetailRow>
          <DetailRow
            label="Created"
            value={new Date(quoteRequest.createdAt).toLocaleDateString(
              "en-GB",
              { day: "numeric", month: "long", year: "numeric" }
            )}
          />

          {selectedPriceData && (
            <div className="pt-4 border-t border-amber-200">
              <h3 className="text-lg font-semibold text-amber-800 mb-2">
                Price Details ({selectedPriceData.size})
              </h3>
              <div className="space-y-2">
                {selectedPriceData.originalPrice >
                  selectedPriceData.sellingPrice && (
                  <DetailRow
                    label="Original Price"
                    value={`₹${selectedPriceData.originalPrice.toLocaleString(
                      "en-IN"
                    )}`}
                  />
                )}
                <DetailRow
                  label="Selling Price"
                  value={`₹${selectedPriceData.sellingPrice.toLocaleString(
                    "en-IN"
                  )}`}
                  isBold={true}
                />
                {selectedPriceData.originalPrice >
                  selectedPriceData.sellingPrice && (
                  <DetailRow
                    label="You Save"
                    value={`₹${(
                      selectedPriceData.originalPrice -
                      selectedPriceData.sellingPrice
                    ).toLocaleString("en-IN")}`}
                    isGreen={true}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Helper component for consistent row styling
const DetailRow = ({
  label,
  value,
  children,
  isBold = false,
  isGreen = false,
}) => (
  <div className="flex justify-between items-center">
    <span className="text-amber-700 font-medium">{label}:</span>
    {children || (
      <span
        className={`text-amber-800 ${isBold ? "font-bold" : ""} ${
          isGreen ? "text-green-600 font-bold" : ""
        }`}
      >
        {value}
      </span>
    )}
  </div>
);

export default CustomizationInfo;
