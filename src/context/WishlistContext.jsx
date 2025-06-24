"use client";

import { createContext, useContext, useState, useEffect } from "react";
import apiService from "@/app/utils/apiService";
import { showToast } from "@/utils/showToast";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);
  const [hasFetched, setHasFetched] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchWishlist = async (forceRefresh = false) => {
    if (hasFetched && !forceRefresh) return;

    try {
      setLoading(true);
      const response = await apiService.get("/wishlist", {}, true);
      setWishlist(response?.data);
      setHasFetched(true);
    } catch {
      showToast.error("Failed to load wishlist");
    } finally {
      setLoading(false);
    }
  };

  const addToWishlist = async (productId) => {
    try {
      const { data } = await apiService.post("/wishlist", { productId }, true);
      setWishlist(data.items);
      setHasFetched(true);
      showToast.success("Added to wishlist");
      return data.items;
    } catch (error) {
      showToast.error("Failed to add to wishlist");
      throw error;
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      const { data } = await apiService.delete(
        `/wishlist/${productId}`,
        {},
        true
      );
      setWishlist(data.items);
      showToast.success("Removed from wishlist");
      return data.items;
    } catch (error) {
      showToast.error("Failed to remove from wishlist");
      throw error;
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        fetchWishlist,
        addToWishlist,
        removeFromWishlist,
        loading,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}
