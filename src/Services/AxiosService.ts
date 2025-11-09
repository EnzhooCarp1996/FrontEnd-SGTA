import { getToken, isTokenExpired, logout } from "./SessionService";
import toast from "react-hot-toast";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Interceptor de request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (!token || isTokenExpired(token)) {
      logout();
      toast.error("Sesión expirada, vuelva a iniciar sesión");
      throw new Error("Sesión expirada");
    }

    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor de response
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      logout();
      toast.error("Sesión expirada o no autorizada");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
