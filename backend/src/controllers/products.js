const ProductsService = require('../services/products');

const fetchProducts = async (searchCode, RedisCache) => {
    return await ProductsService.searchByCode(searchCode, RedisCache.accessToken);
};

module.exports = {
    fetchProducts
}