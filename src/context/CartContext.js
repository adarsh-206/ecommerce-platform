import React, { createContext, useState, useContext, useEffect } from "react";
import apiService from "@/app/utils/apiService";
import { getLocalCart, saveLocalCart, clearLocalCart } from "./localCart";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const { user, isAuthenticated } = useAuth();

  const fetchCart = async () => {
    if (!isAuthenticated) {
      const localCart = getLocalCart();
      setCartItems(localCart);
      return;
    }

    try {
      const response = await apiService.get("/cart");
      setCartItems(response?.data?.items || []);
    } catch {
      setCartItems([]);
    }
  };

  const syncLocalCartToServer = async () => {
    const localCart = getLocalCart();

    for (const item of localCart) {
      await apiService.post("/cart/add", {
        productId: item.product._id,
        quantity: item.quantity,
        size: item.size,
        color: item.color,
      });
    }

    clearLocalCart();
  };

  //   const addItem = async (productId, size, color) => {
  //     if (!isAuthenticated) {
  //       const localCart = getLocalCart();
  //       const existingItem = localCart.find(
  //         (item) =>
  //           item.product._id === productId &&
  //           item.size === size &&
  //           item.color === color
  //       );

  //       if (existingItem) {
  //         existingItem.quantity += 1;
  //       } else {
  //         localCart.push({
  //           product: { _id: productId },
  //           size,
  //           color,
  //           quantity: 1,
  //         });
  //       }

  //       saveLocalCart(localCart);
  //       setCartItems(localCart);
  //       return;
  //     }

  //     await apiService.post("/cart/add", {
  //       productId,
  //       quantity: 1,
  //       size,
  //       color,
  //     });

  //     await fetchCart();
  //   };

  const addItem = async (productId, size, color) => {
    if (!isAuthenticated) {
      const localCart = getLocalCart();
      const existingItem = localCart.find(
        (item) =>
          item.product._id === productId &&
          item.size === size &&
          item.color === color
      );

      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.totalPrice =
          existingItem.priceAtAddition * existingItem.quantity;
      } else {
        // Fetch full product details before adding
        const productResponse = await apiService.get(
          `/buyer/get-product/${productId}`
        );
        const productData = productResponse?.data;

        // Find price based on selected size
        const sizeData = productData.priceBySize.find((s) => s.size === size);

        console.log("sizeData:---->>", productData);

        if (!sizeData) {
          console.error("Selected size not found in product data");
          return;
        }

        const price = sizeData.sellingPrice;
        const originalPrice = sizeData.originalPrice;

        // calculate discount
        const discount =
          originalPrice > 0
            ? Math.round(
                ((originalPrice - price) / originalPrice) * 100 * 100
              ) / 100
            : 0;

        let imageUrl = productData?.images?.main?.url;

        if (
          productData.images.main.colorHex?.toLowerCase() ===
          color.toLowerCase()
        ) {
          imageUrl = productData.images.main.url;
        } else {
          const matchedExtra = productData.images.extras.find(
            (img) => img.colorHex?.toLowerCase() === color.toLowerCase()
          );

          if (matchedExtra) {
            imageUrl = matchedExtra.url;
          }
        }

        localCart.push({
          product: {
            _id: productData.id,
            name: productData.name,
            image: imageUrl,
            brand: productData.brand,
            originalPrice: originalPrice,
            discount: discount,
          },
          size,
          color,
          quantity: 1,
          priceAtAddition: price,
          totalPrice: price,
          currency: sizeData.currency,
        });
      }

      saveLocalCart(localCart);
      setCartItems(localCart);
      return;
    }

    await apiService.post("/cart/add", {
      productId,
      quantity: 1,
      size,
      color,
    });

    await fetchCart();
  };

  const updateItem = async (productId, size, color, newQuantity) => {
    if (!isAuthenticated) {
      let localCart = getLocalCart();
      const itemIndex = localCart.findIndex(
        (item) =>
          item.product._id === productId &&
          item.size === size &&
          item.color === color
      );

      if (itemIndex !== -1) {
        if (newQuantity < 1) {
          localCart.splice(itemIndex, 1);
        } else {
          localCart[itemIndex].quantity = newQuantity;
        }
      }

      saveLocalCart(localCart);
      setCartItems(localCart);
      return;
    }

    if (newQuantity < 1) {
      await apiService.delete("/cart/remove", {
        data: { productId, size, color },
      });
    } else {
      await apiService.patch("/cart/update", {
        productId,
        quantity: newQuantity,
        size,
        color,
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
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      syncLocalCartToServer().then(fetchCart);
    }
  }, [isAuthenticated]);

  return (
    <CartContext.Provider
      value={{ cartItems, addItem, updateItem, getItemQuantity, fetchCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
