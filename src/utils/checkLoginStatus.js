import apiService from "@/app/utils/apiService";

let cachedStatus = null;
let lastChecked = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

const checkLoginStatus = async () => {
  const now = Date.now();

  if (
    cachedStatus !== null &&
    lastChecked &&
    now - lastChecked < CACHE_DURATION
  ) {
    return cachedStatus;
  }

  try {
    const response = await apiService.get("/is-login", {}, true);
    const isLoggedIn = response?.data?.loggedIn === true;

    cachedStatus = isLoggedIn;
    lastChecked = now;

    return isLoggedIn;
  } catch {
    cachedStatus = false;
    lastChecked = now;
    return false;
  }
};

export default checkLoginStatus;
