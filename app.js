const express = require('express');
const axios = require('axios');
const crypto = require('crypto');

const app = express();
const port = process.env.PORT || 3000;


// Base URL for the external API
const BASE_URL = 'https://web.nirax.ru/cross/api/v3';
const USERNAME = 'testeruser'
const PASSWORD = '123456'

function generateMD5(login, password) {
  const combined = `${login}:${password}`;
  let token =  crypto.createHash('md5').update(combined).digest('hex');
  return token
}

app.use(express.json());

app.get('/api/search/:code', async (req, res) => {
  const searchCode = req.params.code;
  try {
    const response = await axios.get(`${BASE_URL}/parts/by-searchcode/${encodeURIComponent(searchCode)}`, {
      headers: {
        Authorization: `${generateMD5(USERNAME, PASSWORD)}`
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching data from external API:', error.message);
    if (error.status === 500) {
      res.status(500).json({ error: 'Failed to fetch data from external API' });
    } else {
      if (error.response.data) {
        res.status(error.response.status).json({ error: error.response.data.message});
      } else {
        res.status(error.response.status).json({ error: error.message});
      }
     
    }
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
