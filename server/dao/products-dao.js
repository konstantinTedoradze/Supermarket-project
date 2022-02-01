const connection = require("./connection-wrapper");
let ErrorType = require("./../errors/error-type");
let ServerError = require("./../errors/server-error");

async function getProducts() {
  const sql = `SELECT product_name As name, price, picture FROM products`;
  try {
    return await connection.execute(sql);
  } catch(e) {
    throw new ServerError(ErrorType.PRODUCT_DATA_ERROR,sql,e);
  }

}

async function getAllCategories() {
  const sql = `SELECT id, category_name As categoryName FROM category`;
  try {
    return await connection.execute(sql);
  }
  catch (e) {
      throw new ServerError(ErrorType.PRODUCT_DATA__ERROR_CATEGORY_NAME, sql, e);
  }
}

// async function getCategoryProducts(categoryId) {
//   const sql = `SELECT product_name As name, price, picture FROM products where category_id = ?`;

//   let parameters = [categoryId];
//   let categoryProducts = await connection.executeWithParameters(
//     sql,
//     parameters
//   );
//   console.log(categoryProducts);
//   return categoryProducts;
// }


async function getCategoryProducts(categoryName) {
  const sql = `SELECT products.id as product_id, products.product_name As name, products.price, products.picture,category.category_name As category
  FROM products
  RIGHT JOIN category
  ON products.category_id = category.id WHERE category.category_name = ?;`;

  let parameters = [categoryName];
  try {
    let categoryProducts = await connection.executeWithParameters(
      sql,
      parameters
    );
    console.log(categoryProducts);
    return categoryProducts;
  } catch {
    throw new ServerError(ErrorType.PRODUCTS_BY_CATEGORY_ERROR, sql, e);
  }
 
}


async function getFillteredProducts(searchName) {
  
  const sql = `SELECT products.id as product_id, products.product_name As name, products.price, products.picture FROM products WHERE product_name LIKE '%${searchName}%'`;


  try {
    return await connection.execute(sql);
  }
  catch (e) {
    
    throw new ServerError(ErrorType.FILLTERED_PRODUCT_ERROR, sql, e);
  }
}

module.exports = {
  getProducts,
  getCategoryProducts,
  getAllCategories,
  getFillteredProducts
};
