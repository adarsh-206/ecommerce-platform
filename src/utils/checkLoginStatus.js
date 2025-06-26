import apiService from "@/app/utils/apiService";

let cachedStatus = null;
let lastChecked = null;
let isChecking = false; // prevent parallel requests
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

const checkLoginStatus = async () => {
  const now = Date.now();

  // Use cached result if within the cache duration
  if (
    cachedStatus !== null &&
    lastChecked &&
    now - lastChecked < CACHE_DURATION
  ) {
    return cachedStatus;
  }

  // Prevent spamming rapid API calls
  if (isChecking) return cachedStatus;

  try {
    isChecking = true;

    const response = await apiService.get("/is-login", {}, true);
    const isLoggedIn = response?.data?.loggedIn === true;

    cachedStatus = isLoggedIn;
    lastChecked = now;

    return isLoggedIn;
  } catch {
    cachedStatus = false;
    lastChecked = now;
    return false;
  } finally {
    isChecking = false;
  }
};

export default checkLoginStatus;
