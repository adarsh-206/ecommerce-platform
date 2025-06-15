import React, { createContext, useState, useContext, useEffect } from "react";
import apiService from "@/app/utils/apiService";
import { getOrCreateGuestId, getGuestId } from "@/utils/guestId";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const fetchCart = async () => {
    const guestId = getGuestId();
    if (!guestId) return;

    try {
      const response = await apiService.get("/cart", { guestId });
      setCartItems(response?.data?.items || []);
    } catch {
      setCartItems([]);
    }
  };

  const addItem = async (productId, size, color) => {
    const guestId = getOrCreateGuestId();

    await apiService.post("/cart/add", {
      productId,
      quantity: 1,
      size,
      color,
      guestId,
    });

    await fetchCart();
  };

  const updateItem = async (productId, size, color, newQuantity) => {
    const guestId = getOrCreateGuestId();

    if (newQuantity < 1) {
      await apiService.delete("/cart/remove", {
        data: { productId, size, color, guestId },
      });
    } else {
      await apiService.patch("/cart/update", {
        productId,
        quantity: newQuantity,
        size,
        color,
        guestId,
      });
    }

    await fetchCart();
  };

  const getItemQuantity = (productId, size, color) => {
    const cartItem = cartItems.find(
      (item) =>
        item.product._id === productId &&
        item.size === size &&
        item.color === color
    );
    return cartItem ? cartItem.quantity : 0;
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <CartContext.Provider
      value={{ cartItems, addItem, updateItem, getItemQuantity, fetchCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
