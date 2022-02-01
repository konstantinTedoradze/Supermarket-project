let adminsDao = require("../dao/admin-dao");
let ServerError = require("../errors/server-error");
let ErrorType = require("../errors/error-type");

async function getCategoryId(categoryName){
    return await adminsDao.getCategoryId(categoryName);

}

async function addNewProduct(productDetails) {
    return await adminsDao.addNewProduct(productDetails);
}


async function updateProduct(productDetails) {
  await validateProductDetails(productDetails);
  return await adminsDao.updateProduct(productDetails);
}

async function validateProductDetails(productDetails) {
  if (!productDetails.productName || productDetails.productName === "") {
    throw new ServerError(ErrorType.INVALID_PRODUCT_NAME);
  }
  if (!productDetails.category || productDetails.category === "") {
    throw new Error(ErrorType.INVALID_PRODUCT_CATEGORY);
  }
  if (!productDetails.price || productDetails.price === "") {
    throw new ServerError(ErrorType.INVALID_PRODUCT_PRICE);
  }
  if (!productDetails.picture || productDetails.picture === "") {
    throw new Error(ErrorType.INVALID_PRODUCT_PICTURE);
  }
}



module.exports = {
    getCategoryId,
    addNewProduct,
    updateProduct
}