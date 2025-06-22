"use client";

import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { UserProvider } from "@/context/UserContext";

export function Providers({ children }) {
  return (
    <AuthProvider>
      <UserProvider>
        <CartProvider>{children}</CartProvider>
      </UserProvider>
    </AuthProvider>
  );
}
