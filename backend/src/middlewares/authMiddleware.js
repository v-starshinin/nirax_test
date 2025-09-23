const RedisCache = require('../services/redis')
const AuthController = require('../controllers/auth')
const USERNAME = process.env.NIRAX_USERNAME || 'testeruser';
const PASSWORD = process.env.NIRAX_PASSWORD || '123456';
  
  
const authMiddleware = async (req, res, next) => {
  if (!await RedisCache.hasValidToken()) {
    try {
      if (!await RedisCache.hasValidRefreshToken()) {
        await AuthController.authenticate(USERNAME, PASSWORD, RedisCache);
      } else {
        await AuthController.refreshToken(RedisCache);
      }
    } catch (error) {
      return handleErrorResponse(res, error);
    }
  }
  next();
};

module.exports = {
    authMiddleware
}