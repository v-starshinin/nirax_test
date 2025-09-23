const AuthService = require('../services/auth');

const authenticate = async (USERNAME, PASSWORD, RedisCache) => {
    const tokens = await AuthService.login(USERNAME, PASSWORD);
    await RedisCache.setTokens(tokens.accessToken, tokens.refreshToken);
};
const refreshToken = async (RedisCache) => {
    const refreshToken = await RedisCache.getRefreshToken();
    const tokens = await AuthService.refreshToken(refreshToken);
    await RedisCache.setTokens(tokens.accessToken, tokens.refreshToken);
};


module.exports = {
    refreshToken,
    authenticate
}