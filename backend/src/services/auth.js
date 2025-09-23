const axios = require('axios');

const API_BASE_URL = process.env.NIRAX_API_BASE_URL || 'https://web.nirax.ru/cross/api/v3';

const login = async (login, password)=> {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth`, {login, password});
    return response.data.result; 
  } catch (error) {
    console.error('Error during login:', error);
    throw error; 
  }
};

const refreshToken = async (refreshToken)=> {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {refreshToken});
    return response.data.result; 
  } catch (error) {
    console.error('Error during refresh token:', error);
    throw error; 
  }
};


module.exports = {
    refreshToken,
    login
}
