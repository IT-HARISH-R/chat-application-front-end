import axios from "axios";

export const axiosInstance = axios.create({

  // baseURL: "https://chat-application-backend-znue.onrender.com/api",
  baseURL: import.meta.env.MODE === "development" ? "http://localhost:3000/api" : "/api",
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Attach Bearer token
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);