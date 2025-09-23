const express = require('express');
const cors = require('cors');

const ProductsController = require('./src/controllers/products')
const RedisCache = require('./src/services/redis')
const middlewares = require('./src/middlewares/authMiddleware')
const errorHandlers = require('./src/errorHandlers')

const app = express();
const port = process.env.PORT || 3001;


app.use(express.json());
app.use(cors());


app.get('/api/search/:code', middlewares.authMiddleware, async (req, res) => {
  const searchCode = req.params.code;
  try {
    const accessToken = await RedisCache.getAccessToken();
    const products = await ProductsController.fetchProducts(searchCode, accessToken);
    res.json(products);
  } catch (error) {
    errorHandlers.remoteApiHandleErrorResponse(res, error);
  }
});

app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    redis: RedisCache.isConnected ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString()
  });
});


app.post('/api/logout', async (req, res) => {
  try {
    await RedisCache.clearTokens();
    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(500).send(error.message);
  }
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
