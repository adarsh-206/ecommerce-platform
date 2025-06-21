import apiService from "@/app/utils/apiService";

export const fetchStateCityData = async (endpoint) => {
  try {
    const response = await apiService.get(endpoint, {}, true);

    if (response.status) {
      return response.data;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
};
