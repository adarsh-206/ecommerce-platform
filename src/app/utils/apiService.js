// app/utils/apiService.js
import axios from "axios";
import { redirect } from "next/navigation";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

instance.interceptors.response.use(
  (res) => res,
  (err) => {
    const isUnauthorized = err.response?.status === 401;
    const isLoginRequest = err.config?.url?.includes("/login");

    // if (isUnauthorized && !isLoginRequest) {
    //   if (typeof window !== "undefined") {
    //     window.location.href = "/";
    //   } else {
    //     redirect("/");
    //   }
    // }

    return Promise.reject(err);
  }
);

const getHeaders = (useAuth, isFormData) => {
  const headers = {};
  if (useAuth) {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }
  if (isFormData) {
    headers["Content-Type"] = "multipart/form-data";
  } else {
    headers["Content-Type"] = "application/json";
  }
  return headers;
};

const apiService = {
  get: (url, params = {}, useAuth = false) =>
    instance.get(url, {
      headers: getHeaders(useAuth, false),
      params,
    }),

  post: (url, data, useAuth = false, isFormData = false) =>
    instance.post(url, data, { headers: getHeaders(useAuth, isFormData) }),

  put: (url, data, useAuth = false, isFormData = false) =>
    instance.put(url, data, { headers: getHeaders(useAuth, isFormData) }),

  patch: (url, data, useAuth = false, isFormData = false) =>
    instance.patch(url, data, { headers: getHeaders(useAuth, isFormData) }),

  delete: (url, data = {}, useAuth = false) =>
    instance.delete(url, {
      headers: getHeaders(useAuth, false),
      data,
    }),
};

export default apiService;
