import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8081/api',
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
    console.log("Token de inicio de sesión de la instancia: ", config.headers.Authorization);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;