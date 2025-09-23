const axios = require('axios');

const API_BASE_URL = process.env.NIRAX_API_BASE_URL || 'https://web.nirax.ru/cross/api/v3';

const searchByCode = async (searchCode, token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/parts/by-searchcode/${searchCode}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return response.data.result;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};


module.exports = {
  searchByCode
}