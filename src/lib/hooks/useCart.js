import { useState, useEffect } from "react";

export default function useCart() {
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load cart from localStorage on client-side
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("cart");
      setCart(savedCart ? JSON.parse(savedCart) : []);
      setIsLoading(false);
    }
  }, []);

  const addToCart = (product, quantity = 1) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);

      let newCart;
      if (existingItem) {
        newCart = prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        newCart = [...prevCart, { ...product, quantity }];
      }

      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(newCart));
      }

      return newCart;
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => {
      const newCart = prevCart.filter((item) => item.id !== productId);
      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(newCart));
      }
      return newCart;
    });
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) return;

    setCart((prevCart) => {
      const newCart = prevCart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      );
      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(newCart));
      }
      return newCart;
    });
  };

  const clearCart = () => {
    setCart([]);
    if (typeof window !== "undefined") {
      localStorage.removeItem("cart");
    }
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return {
    cart,
    isLoading,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
  };
}
