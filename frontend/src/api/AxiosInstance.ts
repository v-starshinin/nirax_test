// src/axiosInstance.ts
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api', // Set your base URL
});

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response; // Return the response if successful
  },
  (error) => {
    // Handle errors globally
    if (error.response) {
      // The request was made and the server responded with a status code
      console.error('Error response:', error.response.data);
      return Promise.reject(error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Error request:', error.request);
      return Promise.reject({ message: 'No response received from server.' });
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error message:', error.message);
      return Promise.reject({ message: error.message });
    }
  }
);

export default axiosInstance;
