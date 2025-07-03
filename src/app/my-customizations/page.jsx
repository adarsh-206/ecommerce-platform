"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import MainLayout from "@/components/layouts/MainLayout";
import { useCustomProduct } from "@/components/hooks/useCustomProduct";
import ProductImageGallery from "@/components/custom-product/ProductImageGallery";
import ProductDetails from "@/components/custom-product/ProductDetails";
import ProductCustomization from "@/components/custom-product/ProductCustomization";
import CustomizationInfo from "@/components/custom-product/CustomizationInfo";
import ImageZoomModal from "@/components/custom-product/ImageZoomModal";
import { ShoppingCart } from "lucide-react";

const CustomProductOrderPage = () => {
  const router = useRouter();
  const {
    customization,
    product,
    isLoading,
    error,
    selectedSize,
    setSelectedSize,
    selectedColor,
    handleColorSelect,
    selectedImage,
    handleImageSelect,
    memoizedImages,
    maxQuantity,
    selectedPriceData,
  } = useCustomProduct();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState(0);

  const openModal = (index) => {
    setModalImageIndex(index);
    setIsModalOpen(true);
  };

  const statusStyles = {
    pending: "bg-yellow-100 text-yellow-800",
    approved: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
  };

  if (isLoading) {
    return (
      <MainLayout>
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 px-4 py-8 animate-pulse">
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="h-10 w-1/3 bg-amber-200 rounded" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="w-full h-96 bg-amber-200 rounded-lg" />
              <div className="space-y-4">
                <div className="h-6 w-3/4 bg-amber-200 rounded" />
                <div className="h-4 w-1/2 bg-amber-100 rounded" />
                <div className="h-4 w-2/3 bg-amber-100 rounded" />
                <div className="h-10 w-full bg-amber-200 rounded mt-6" />
                <div className="h-10 w-full bg-amber-200 rounded" />
                <div className="h-10 w-1/2 bg-amber-200 rounded" />
              </div>
            </div>
            <div className="h-32 w-full bg-amber-100 rounded-lg" />
          </div>
        </div>
      </MainLayout>
    );
  }

  if (error || !customization || !product) {
    return (
      <MainLayout>
        <div className="min-h-screen flex flex-col items-center justify-center">
          <p className="text-red-500">{error || "Customization not found."}</p>
          <button
            onClick={() => router.push("/my-customizations")}
            className="mt-4 px-4 py-2 bg-amber-600 text-white rounded"
          >
            Go Back
          </button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      {console.log(customization.status)}
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-3xl font-bold text-amber-800">
              Custom Product Order
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <ProductImageGallery
              images={memoizedImages}
              product={product}
              selectedImage={selectedImage}
              onImageSelect={handleImageSelect}
              onImageClick={() => openModal(selectedImage)}
            />

            <div className="space-y-6">
              <ProductDetails
                product={product}
                quoteRequest={customization.quoteRequest}
                priceData={selectedPriceData}
              />
              <ProductCustomization
                product={product}
                selectedSize={selectedSize}
                selectedColor={selectedColor}
                onSizeSelect={setSelectedSize}
                onColorSelect={handleColorSelect}
                maxQuantity={maxQuantity}
                status={customization.status}
              />
            </div>
          </div>

          <CustomizationInfo
            customization={customization}
            product={product}
            selectedPriceData={selectedPriceData}
            sellerName={customization.seller?.storeName}
          />
        </div>
      </div>

      <ImageZoomModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        images={memoizedImages}
        startIndex={modalImageIndex}
        productName={product.name}
      />
    </MainLayout>
  );
};

export default CustomProductOrderPage;
