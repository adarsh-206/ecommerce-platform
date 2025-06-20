"use client";

import { Toaster } from "react-hot-toast";

const ToastProvider = () => {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          background: "linear-gradient(to right, #FFFBEB, #FFF1E6, #FFE4E1)",
          color: "#333",
          border: "1px solid #fbbf24",
          padding: "12px 16px",
          fontWeight: "500",
          borderRadius: "8px",
        },
        duration: 2000,
        success: {
          icon: "✅",
        },
        error: {
          icon: "❌",
        },
      }}
    />
  );
};

export default ToastProvider;
