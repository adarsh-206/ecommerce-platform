import toast from "react-hot-toast";

export const showToast = {
  success: (message) => toast.success(message),
  error: (message) => toast.error(message),
  loading: (message) => toast.loading(message),
  custom: (message) =>
    toast(message, {
      icon: "🔔",
    }),
};
