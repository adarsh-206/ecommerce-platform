import { v4 as uuidv4 } from "uuid";

// Get existing guestId from localStorage
export const getGuestId = () => {
  return localStorage.getItem("guestId");
};

// Create and store new guestId in localStorage
export const createGuestId = () => {
  const guestId = uuidv4();
  localStorage.setItem("guestId", guestId);
  return guestId;
};

// Unified function to get or create guestId
export const getOrCreateGuestId = () => {
  let guestId = getGuestId();
  if (!guestId) {
    guestId = createGuestId();
  }
  return guestId;
};
