const shoppingCartsDao = require("../dao/shoppingCarts-dao");

async function addShoppingCart(userId) {
    return await shoppingCartsDao.addShoppingCart(userId);
}

async function getCurrentCartItem(productId,productQuantity,shoppingCartId) {
    return await shoppingCartsDao.getCurrentCartItem(productId,productQuantity,shoppingCartId);
}

async function getShoppingCartId(userId) {
    return await shoppingCartsDao.getShoppingCartId(userId);
}

async function getAllcartItems(shoppingCartId) {
    return await shoppingCartsDao.getAllcartItems(shoppingCartId);
}

async function deleteCartItem(cartItemId) {
    return await shoppingCartsDao.deleteCartItem(cartItemId);
}

async function deleteCurrentItems(shoppingCartId){
    return await shoppingCartsDao.deleteCurrentItems(shoppingCartId);
}

async function getLastCartDate(shoppingCartId){
    return await shoppingCartsDao.getLastCartDate(shoppingCartId);
}
module.exports = {
    addShoppingCart,
    getCurrentCartItem,
    getShoppingCartId,
    getAllcartItems,
    deleteCartItem,
    deleteCurrentItems,
    getLastCartDate
};