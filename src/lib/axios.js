import axios from "axios"

const api = axios.create({
    baseURL: "http://localhost:3000/api/v1",

})

api.interceptors.request.use(
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



export default api;
