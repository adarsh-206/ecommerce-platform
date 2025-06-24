import { createContext, useContext, useEffect, useState } from "react";
import apiService from "@/app/utils/apiService";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState(null);

  const getUserDetails = async () => {
    try {
      const response = await apiService.get("/user-details", {}, true);
      setUserDetails(response.data);
    } catch (error) {
      console.error(
        "Error fetching user details:",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getUserDetails();
    }
  }, []);

  return (
    <UserContext.Provider value={{ userDetails, setUserDetails }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
