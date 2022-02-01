let connection = require("./connection-wrapper");
let ErrorType = require("./../errors/error-type");
let ServerError = require("./../errors/server-error");


async function getCategoryId(categoryName){
    let sql = "SELECT id FROM category WHERE category_name = ? ";
    let parameters = categoryName;
    try {
        return await connection.executeWithParameters(sql, parameters);
    }
    catch (e) {
        console.log('kukukukuuuu');
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
    }
}

async function addNewProduct(productDetails) {
    let sql = `INSERT INTO products (product_name,price,picture,category_id)  values(?, ?, ?, ?)`;

    let parameters = [
        productDetails.productName,
        productDetails.price,
        productDetails.picture,
        productDetails.category,
    ];
        
    try {
        return await connection.executeWithParameters(sql, parameters);
    }
    catch (e) {
        console.log('leilakoooooo');
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
    }
}

async function updateProduct(productDetails) {
    // let sql =`UPDATE products
    // SET product_name = ${productDetails.productName}, price = ${productDetails.price}, 
    //     picture = ${productDetails.picture}, category_id = ${productDetails.category}
    // WHERE id = ${productDetails.id}`;
    let sql =`UPDATE products
    SET product_name = ?, price = ?, picture = ?, category_id = ?
    WHERE id = ?`;
    
    let parameters = [
        productDetails.productName,
        productDetails.price,
        productDetails.picture,
        productDetails.category,
        productDetails.id
    ];
    try {
        return await connection.executeWithParameters(sql, parameters);
    }catch(e) {
        throw new ServerError(ErrorType.UPDATE_PRODUCT_ERROR, sql, e);
    }
}


module.exports = {
    getCategoryId,
    addNewProduct,
    updateProduct
}