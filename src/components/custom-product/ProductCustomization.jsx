"use client";
import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { Heart, ShoppingCart } from "lucide-react";

const ProductCustomization = ({
  product,
  selectedSize,
  selectedColor,
  onSizeSelect,
  onColorSelect,
  maxQuantity,
}) => {
  const router = useRouter();
  const { addItem, updateItem, getItemQuantity } = useCart();
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const cartQuantity = getItemQuantity(
    product._id,
    selectedSize,
    selectedColor
  );

  const handleAddToCart = async () => {
    if (!selectedSize || !selectedColor) {
      alert("Please select size and color");
      return;
    }
    setIsAddingToCart(true);
    try {
      await addItem(product._id, selectedSize, selectedColor, 1);
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add item to cart");
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleUpdateCartQuantity = async (newQuantity) => {
    if (newQuantity < 0) return;
    try {
      await updateItem(product._id, selectedSize, selectedColor, newQuantity);
    } catch (error) {
      console.error("Error updating cart quantity:", error);
      alert("Failed to update quantity");
    }
  };

  const getSelectedColorName = () => {
    return product.colors?.find((c) => c.hexCode === selectedColor)?.name || "";
  };

  const isOrderable = selectedSize && selectedColor;

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-amber-200 space-y-4">
      <div>
        <label className="block text-sm font-semibold text-amber-800 mb-2">
          Size *
        </label>
        <div className="flex flex-wrap gap-3">
          {product.priceBySize.map((priceItem) => (
            <button
              key={priceItem.size}
              onClick={() => onSizeSelect(priceItem.size)}
              className={`px-4 py-2 rounded-lg border-2 transition-all duration-300 min-w-[60px] ${
                selectedSize === priceItem.size
                  ? "border-amber-500 bg-amber-100 text-amber-800"
                  : "border-amber-200 hover:border-amber-400 text-amber-600"
              }`}
            >
              <div className="text-center">
                <div className="font-semibold">{priceItem.size}</div>
                <div className="text-xs">
                  ₹{priceItem.sellingPrice?.toLocaleString("en-IN")}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-amber-800 mb-2">
          Color * <span className="font-normal">{getSelectedColorName()}</span>
        </label>
        <div className="flex flex-wrap gap-3">
          {product.colors.map((colorObj) => (
            <button
              key={colorObj._id}
              onClick={() => onColorSelect(colorObj.hexCode)}
              className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm border-2 transition-all duration-300 ${
                selectedColor === colorObj.hexCode
                  ? "border-amber-500 bg-amber-100 text-amber-800 shadow-md"
                  : "border-amber-200 bg-amber-50 text-amber-700 hover:border-amber-400"
              }`}
            >
              <div
                className="w-5 h-5 rounded-full border-2"
                style={{ backgroundColor: colorObj.hexCode }}
              ></div>
              <span className="font-medium">{colorObj.name}</span>
            </button>
          ))}
        </div>
      </div>

      {cartQuantity > 0 && (
        <div>
          <label className="block text-sm font-semibold text-amber-800 mb-2">
            Quantity (Max: {maxQuantity})
          </label>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => handleUpdateCartQuantity(cartQuantity - 1)}
              disabled={cartQuantity <= 0}
              className="w-10 h-10 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-800 font-semibold disabled:opacity-50"
            >
              -
            </button>
            <span className="w-12 text-center font-semibold text-amber-800">
              {cartQuantity}
            </span>
            <button
              onClick={() => handleUpdateCartQuantity(cartQuantity + 1)}
              disabled={cartQuantity >= maxQuantity}
              className="w-10 h-10 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-800 font-semibold disabled:opacity-50"
            >
              +
            </button>
          </div>
        </div>
      )}

      <div className="flex space-x-3 pt-4">
        {cartQuantity === 0 ? (
          <button
            onClick={handleAddToCart}
            disabled={isAddingToCart || !isOrderable}
            className={`flex-1 py-3 px-6 rounded-full font-semibold shadow-lg transition-all ${
              isOrderable && !isAddingToCart
                ? "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {isAddingToCart ? "Adding..." : "Add to Cart"}
          </button>
        ) : (
          <button
            onClick={() => router.push("/cart")}
            className="flex-1 flex items-center justify-center py-3 px-6 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full font-semibold shadow-lg"
          >
            <ShoppingCart className="w-5 h-5 mr-2" /> Go to Cart ({cartQuantity}
            )
          </button>
        )}
        <button
          onClick={() => setIsWishlisted(!isWishlisted)}
          className={`p-3 rounded-full shadow-lg transition-all ${
            isWishlisted
              ? "bg-red-100 text-red-600"
              : "bg-white text-amber-600 border-2 border-amber-200"
          }`}
        >
          <Heart
            className="h-6 w-6"
            fill={isWishlisted ? "currentColor" : "none"}
          />
        </button>
      </div>
    </div>
  );
};

export default ProductCustomization;
