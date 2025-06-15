const LOCAL_CART_KEY = "guest_cart";

export const getLocalCart = () => {
  const data = localStorage.getItem(LOCAL_CART_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveLocalCart = (cartItems) => {
  localStorage.setItem(LOCAL_CART_KEY, JSON.stringify(cartItems));
};

export const clearLocalCart = () => {
  localStorage.removeItem(LOCAL_CART_KEY);
};
