const express = require('express');
const cors = require('cors');

const AuthController = require('./src/controllers/auth')
const ProductsController = require('./src/controllers/products')
const RedisCache = require('./src/services/redis')

const app = express();
const port = process.env.PORT || 3001;

const USERNAME = process.env.NIRAX_USERNAME || 'testeruser';
const PASSWORD = process.env.NIRAX_PASSWORD || '123456';

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

  if (!RedisCache.hasValidToken()) {
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
        try {
          await AuthController.refreshToken(RedisCache);
        } catch (error) {
          if (error.status === 401) {
            RedisCache.clearTokens()
             try {
              await AuthController.authenticate(USERNAME, PASSWORD, RedisCache);

              const products = await ProductsController.fetchProducts(searchCode, RedisCache);
              res.json(products)
            } catch (error) {
              handleErrorResponse(res, error);
            }
          }
        }
        const products = await ProductsController.fetchProducts(searchCode, RedisCache);
        res.json(products)
      } else {
        handleErrorResponse(res, error);
      }
    }
  }
});



// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    redis: RedisCache.isConnected ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString()
  });
});

app.get('*', (req, res) => {
  res.status(404).send()
})

// Graceful shutdown
const gracefulShutdown = async () => {
  console.log('Shutting down gracefully...');

  try {
    await RedisCache.disconnect();
    console.log('Redis connection closed');
  } catch (error) {
    console.error('Error during Redis shutdown:', error);
  }

  process.exit(0);
};

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

app.listen(port, async () => {
  await RedisCache.connect()
  console.log(`Server is running on port ${port}`);
  console.log(`Redis host: ${process.env.REDIS_HOST || 'localhost'}`);
  console.log(`Redis port: ${process.env.REDIS_PORT || 6379}`);
});
