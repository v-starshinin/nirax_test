import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3001',
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response; 
  },
  (error) => {
    if (error.response) {
      console.error('Error response:', error.response.data);
      return Promise.reject(error.response);
    } else if (error.request) {

      console.error('Error request:', error.request);
      return Promise.reject({ message: 'No response received from server.' });
    } else {

      console.error('Error message:', error.message);
      return Promise.reject({ message: error.message });
    }
  }
);

export default axiosInstance;
