import axios from "axios";

const apiUrl = (import.meta.env.VITE_API_URL || "").trim().replace(/\/+$/, "");

const api = axios.create({
  baseURL: apiUrl ? `${apiUrl}/api` : "/api",
  withCredentials: false,
});

api.interceptors.request.use((request) => {
  const token = localStorage.getItem("token");

  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
  }

  return request;
});

export default api;
