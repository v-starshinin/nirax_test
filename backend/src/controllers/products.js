const ProductsService = require('../services/products');

const fetchProducts = async (searchCode, RedisCache) => {
    const accessToken = await RedisCache.getAccessToken();
    return await ProductsService.searchByCode(searchCode, accessToken);
};

module.exports = {
    fetchProducts
}