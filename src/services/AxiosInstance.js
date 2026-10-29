import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL || "/api";

const instance = axios.create({
  baseURL: `${apiUrl}`,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',

  },
});

instance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(response => response, error => {
  if (error.response?.status === 401 && !error.config?.url?.startsWith("/auth/")) {
    localStorage.removeItem("user"); sessionStorage.removeItem("user"); sessionStorage.removeItem("token");
    window.location.replace("/auth/login");
  }
  return Promise.reject(error);
});
export default instance;