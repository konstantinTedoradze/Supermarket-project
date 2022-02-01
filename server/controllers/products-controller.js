let productsLogic = require("../logic/products-logic");
const express = require("express");
const cachModule = require("../dao/cache-module");
const router = express.Router();

// POST http://localhost:3001/users/login
router.get("/", async (request, response, next) => {
  try {
    const products = await productsLogic.getAllProducts();
    response.json(products);
  } catch (error) {
    return next(error);
  }
});



router.get("/categories", async (request, response, next) => {
  try {
    const categories = await productsLogic.getAllCategories();
    response.json(categories);
  } catch (error) {
    return next(error);
  }
});


// http://localhost:3001/products/byCategories?category=Meat&Fish
router.get("/byCategories", async (request, response, next) => {
  const categoryName = request.query.category;
  console.log('555555555555555555',categoryName);
  try {
    const categoryProducts = await productsLogic.getCategoryProducts(categoryName);
    response.json(categoryProducts);
  } catch (error) {
    return next(error);
  }
});

// http://localhost:3001/products/byFilter?searchName=kote
router.get("/byFilter", async (request, response, next) => {
  const searchName = request.query.searchName;
  console.log('555555555555555555',searchName);
  try {
    const nameFillteredProducts = await productsLogic.getFillteredProducts(searchName);
    response.json(nameFillteredProducts);
  } catch (error) {
    return next(error);
  }
});



module.exports = router;
