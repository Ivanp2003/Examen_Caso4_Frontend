import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    const status = error.response?.status;
    const url = error.config?.url;

    // 🚨 NO redirigir si el error viene del login
    if (status === 401 && !url.includes("/auth/login")) {
      localStorage.clear();
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default api;
