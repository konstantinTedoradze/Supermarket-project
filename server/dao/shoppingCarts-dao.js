let connection = require("./connection-wrapper");
let ErrorType = require("../errors/error-type");
let ServerError = require("../errors/server-error");


async function addShoppingCart(userId) {
    let sql = `INSERT INTO shopping_cart (user_id)  values (?)`;

    let parameters = [userId];
        
    try {
      return await connection.executeWithParameters(sql, parameters);
    }
    catch (e) {
         console.log('koteeeeeeeeeeeeeeeeee');
        throw new ServerError(ErrorType.ADD_SHOPPING_CART_ERROR, sql, e);
    }
}

async function getShoppingCartId(userId){
    let sql = 'SELECT id from shopping_cart WHERE user_id = ?'

    let parameters = [userId];

    try {
        return await connection.executeWithParameters(sql, parameters);
      }
      catch (e) {
           console.log('jinglebelll');
          throw new ServerError(ErrorType.SHOPPING_CART_ID_ERROR, sql, e);
      }

}

async function getCurrentCartItem(productId,productQuantity,shopingCartId) {
    let sql = `INSERT INTO cart_item (product_id,quantity,shopping_cart_id)  values (?,?,?)`;

    let parameters = [productId,productQuantity,shopingCartId];
        console.log(productId,productQuantity,shopingCartId,"8888888888");
    try {
      return await connection.executeWithParameters(sql, parameters);
    }
    catch (e) {
         console.log('koteeeeeeeeeeeeeeeeee');
        throw new ServerError(ErrorType.GURRENT_CART_ITEM_ERROR, sql, e);
    }
}


async function getAllcartItems(shoppingCartId) {
    let sql = `SELECT cart_item.id,cart_item.product_id As productId, cart_item.quantity, products.product_name As name, products.price, products.picture
    FROM cart_item
    RIGHT JOIN products ON cart_item.product_id = products.id WHERE shopping_cart_id = ?;`;

    let parameters = [shoppingCartId];
        
    try {
      return await connection.executeWithParameters(sql, parameters);
    }
    catch (e) {
         console.log('jobeee');
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
    }
}


async function deleteCartItem(cartItemId) {
    let sql = `DELETE FROM cart_item WHERE id = ?`;

    let parameters = [cartItemId];
        
    try {
      return await connection.executeWithParameters(sql, parameters);
    }
    catch (e) {
         console.log('leilakoooo');
        throw new ServerError(ErrorType.DELETE_CART_ITEM_ERROR, sql, e);
    }
}

async function deleteCurrentItems(shoppingCartId) {
    let sql = `DELETE FROM cart_item WHERE shopping_cart_id = ?`;

    let parameters = [shoppingCartId];
        
    try {
      return await connection.executeWithParameters(sql, parameters);
    }
    catch (e) {
         console.log('leilakoooo');
        throw new ServerError(ErrorType.DELETE_CURRENT_ITEM_ERROR, sql, e);
    }
}



async function getLastCartDate(shoppingCartId) {
  let sql = " SELECT  max(Item_date) as date from cart_item WHERE shopping_cart_id = ?";
  let parameters = [shoppingCartId];
  try {
      let lastDate = await connection.executeWithParameters(sql, parameters);
      console.log(lastDate);
      return lastDate[0].date;
  } catch(e) {
      throw new ServerError(ErrorType.LAST_CART_DATE, sql, e);
  }
}

module.exports = {
    addShoppingCart,
    getShoppingCartId,
    getCurrentCartItem,
    getAllcartItems,
    deleteCartItem,
    deleteCurrentItems,
    getLastCartDate
};

