import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import apiService from "@/app/utils/apiService";
import { getLocalCart, saveLocalCart, clearLocalCart } from "./localCart";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const { isAuthenticated } = useAuth();

  const fetchCart = useCallback(async () => {
    try {
      if (!isAuthenticated) {
        const localCart = getLocalCart();
        setCartItems(localCart);
      } else {
        const response = await apiService.get("/cart", {}, true);
        setCartItems(response?.data?.items || []);
      }
    } catch {
      setCartItems([]);
    }
  }, [isAuthenticated]);

  const syncLocalCartToServer = useCallback(async () => {
    const localCart = getLocalCart();
    if (localCart.length === 0) return;

    const requests = localCart.map((item) =>
      apiService.post(
        "/cart/add",
        {
          productId: item.product._id,
          quantity: item.quantity,
          size: item.size,
          color: item.color,
        },
        true
      )
    );

    try {
      await Promise.all(requests); // Sync all items in parallel
      clearLocalCart();
    } catch (err) {
      console.error("Error syncing local cart to server:", err);
    }
  }, []);

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
        const productResponse = await apiService.get(
          `/buyer/get-product/${productId}`
        );
        const productData = productResponse?.data;
        const sizeData = productData.priceBySize.find((s) => s.size === size);
        if (!sizeData) return;

        const price = sizeData.sellingPrice;
        const originalPrice = sizeData.originalPrice;
        const discount =
          originalPrice > 0
            ? Math.round(((originalPrice - price) / originalPrice) * 10000) /
              100
            : 0;

        let imageUrl = productData?.images?.main?.url;
        if (
          productData.images.main.colorHex?.toLowerCase() !==
          color.toLowerCase()
        ) {
          const matchedExtra = productData.images.extras.find(
            (img) => img.colorHex?.toLowerCase() === color.toLowerCase()
          );
          if (matchedExtra) imageUrl = matchedExtra.url;
        }

        localCart.push({
          product: {
            _id: productData.id,
            name: productData.name,
            image: imageUrl,
            brand: productData.brand,
            originalPrice,
            discount,
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

    await apiService.post(
      "/cart/add",
      { productId, quantity: 1, size, color },
      true
    );
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
          localCart[itemIndex].totalPrice =
            localCart[itemIndex].priceAtAddition * newQuantity;
        }
      }

      saveLocalCart(localCart);
      setCartItems(localCart);
      return;
    }

    if (newQuantity < 1) {
      await apiService.delete("/cart/remove", { productId, size, color }, true);
    } else {
      await apiService.patch(
        "/cart/update",
        { productId, quantity: newQuantity, size, color },
        true
      );
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
    const initializeCart = async () => {
      if (isAuthenticated) {
        await syncLocalCartToServer();
      }
      await fetchCart();
    };
    initializeCart();
  }, [isAuthenticated, syncLocalCartToServer, fetchCart]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addItem,
        updateItem,
        getItemQuantity,
        fetchCart,
        syncLocalCartToServer,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
