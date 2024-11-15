// axiosConfig.js
import axios from 'axios';

// Create an axios instance with base configurations
const axiosInstance = axios.create({
  //baseURL: 'https://car-management-system-bvkv.onrender.com/', // Replace with your actual API base URL or set in .env
  baseURL: 'http://localhost:4000/',
  timeout: 5000, // Adjust timeout as needed
  headers: {
    'Content-Type': 'application/json',
    // Add other headers here if necessary
  },
});

// Optional: Add request interceptors
axiosInstance.interceptors.request.use(
  (config) => {
    // If you need to add a token to the headers, do it here
    const token = localStorage.getItem('authToken'); // Or however you store your token
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Optional: Add response interceptors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized responses here, e.g., redirect to login
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;