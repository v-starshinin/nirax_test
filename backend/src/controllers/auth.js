const AuthService = require('../services/auth');

const authenticate = async (USERNAME, PASSWORD, RedisCache) => {
    const tokens = await AuthService.login(USERNAME, PASSWORD);
    RedisCache.accessToken = tokens.accessToken;
    RedisCache.refreshToken = tokens.refreshToken;
};
const refreshToken = async (RedisCache) => {
    const tokens = await AuthService.refreshToken(RedisCache.refreshToken);
    RedisCache.accessToken = tokens.accessToken;
    RedisCache.refreshToken = tokens.refreshToken;
};


module.exports = {
    refreshToken,
    authenticate
}