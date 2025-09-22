const express = require('express');
const cors = require('cors');

const AuthController = require('./src/controllers/auth')
const ProductsController = require('./src/controllers/products')

const app = express();
const port = process.env.PORT || 3000;

const BASE_URL = 'https://web.nirax.ru/cross/api/v3';
const USERNAME = 'testeruser';
const PASSWORD = '123456';

const RedisCache = {
  accessToken: null,
  refreshToken: null,
};

app.use(express.json());
app.use(cors());

const handleErrorResponse = (res, error) => {
  if (error.response && error.response.data) {
    res.status(error.response.status).json({ error: error.response.data.message });
  } else {
    res.status(error.status || 500).json({ error: error.message || 'An error occurred' });
  }
};


app.get('/api/search/:code', async (req, res) => {
  const searchCode = req.params.code;

  if (!RedisCache.accessToken) {
    try {
      await AuthController.authenticate(USERNAME, PASSWORD, RedisCache);

      const products = await ProductsController.fetchProducts(searchCode, RedisCache);
      res.json(products)
    } catch (error) {
      handleErrorResponse(res, error);
    }

  } else {
    try {
      const products = await ProductsController.fetchProducts(searchCode, RedisCache);
      res.json(products)
    } catch (error) {
      if (error.status === 401) {
        await AuthController.refreshToken(RedisCache);
        const products = await ProductsController.fetchProducts(searchCode, RedisCache);
        res.json(products)
      } else {
        handleErrorResponse(res, error);
      }
    }
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
