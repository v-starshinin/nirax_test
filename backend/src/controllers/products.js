const ProductsService = require('../services/products');

const fetchProducts = async (searchCode, accessToken) => {
    return await ProductsService.searchByCode(searchCode, accessToken);
};

module.exports = {
    fetchProducts
}