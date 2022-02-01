const productsDao = require("../dao/products-dao");

async function getAllProducts() {
  return await productsDao.getProducts();
}

// async function getCategoryProducts(categoryId) {
//     return await productsDao.getCategoryProducts(categoryId);
// }

async function getCategoryProducts(categoryName) {
  return await productsDao.getCategoryProducts(categoryName);
}

async function getAllCategories() {
  return await productsDao.getAllCategories();
}


async function getFillteredProducts(searchName) {
  return await productsDao.getFillteredProducts(searchName);
}

module.exports = {
    getAllProducts,
    getCategoryProducts,
    getAllCategories,
    getFillteredProducts
};