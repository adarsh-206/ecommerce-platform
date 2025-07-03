// hooks/useCustomProduct.js
"use client";
import { useState, useEffect, useMemo } from "react";
import apiService from "@/app/utils/apiService";

export const useCustomProduct = () => {
  const [customization, setCustomization] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const fetchCustomization = async () => {
      setIsLoading(true);
      try {
        const response = await apiService.get(
          `/seller-quote/response`,
          {},
          true
        );

        // Correction: API returns an array, we take the first element.
        const data = response.data[0];

        if (!data) {
          throw new Error("Customization response not found.");
        }

        setCustomization(data);

        // --- Set Initial State ---
        if (data.customProduct?.priceBySize?.length > 0) {
          setSelectedSize(data.customProduct.priceBySize[0].size);
        }

        if (data.customProduct?.colors?.length > 0) {
          const firstColor = data.customProduct.colors[0];
          setSelectedColor(firstColor.hexCode);
          // Sync image with the first color
          const initialImageIndex = allImages(
            data.customProduct.images
          ).findIndex(
            (img) =>
              img.colorHex?.toLowerCase() === firstColor.hexCode?.toLowerCase()
          );
          setSelectedImage(initialImageIndex !== -1 ? initialImageIndex : 0);
        }

        setError(null);
      } catch (err) {
        setError("Failed to load customization details");
        console.error("Error fetching customization:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCustomization();
  }, []);

  const product = customization?.customProduct;

  const allImages = (productImages) => {
    if (!productImages) return [];
    const images = [];
    if (productImages.main?.url) {
      images.push({ ...productImages.main, type: "main" });
    }
    if (productImages.extras?.length) {
      images.push(
        ...productImages.extras.map((e) => ({ ...e, type: "extra" }))
      );
    }
    return images;
  };

  const memoizedImages = useMemo(() => allImages(product?.images), [product]);

  const getImageIndexForColor = (colorHex) => {
    if (!colorHex) return 0;
    const imageIndex = memoizedImages.findIndex(
      (img) => img.colorHex?.toLowerCase() === colorHex.toLowerCase()
    );
    return imageIndex !== -1 ? imageIndex : 0;
  };

  const handleColorSelect = (colorHex) => {
    setSelectedColor(colorHex);
    setSelectedImage(getImageIndexForColor(colorHex));
  };

  const handleImageSelect = (index) => {
    setSelectedImage(index);
    const image = memoizedImages[index];
    if (image?.colorHex) {
      const matchingColor = product.colors?.find(
        (color) => color.hexCode?.toLowerCase() === image.colorHex.toLowerCase()
      );
      if (matchingColor) {
        setSelectedColor(matchingColor.hexCode);
      }
    }
  };

  // Correction: Stock is at the product level, not per size.
  const maxQuantity = useMemo(() => product?.stock?.quantity || 10, [product]);

  const selectedPriceData = useMemo(() => {
    return product?.priceBySize?.find((p) => p.size === selectedSize) || null;
  }, [product, selectedSize]);

  return {
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
  };
};
