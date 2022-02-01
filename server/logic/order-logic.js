let ordersDao = require("../dao/order-dao");
let ServerError = require("../errors/server-error");
let ErrorType = require("../errors/error-type");


async function addOrderData(orderDetails) {
    // Validations
    await validateOrderDetails(orderDetails);
    
    return await ordersDao.addOrderData(orderDetails);
}
 


async function validateOrderDetails(orderDetails) {
    if (!orderDetails.userId || orderDetails.userId === "") {
      throw new ServerError(ErrorType.INVALID_ORDER_USERID);
    }
    if (!orderDetails.shoppingCartId || orderDetails.shoppingCartId === "") {
        throw new ServerError(ErrorType.INVALID_SHOPPING_CART_ID);
    }
    if (!orderDetails.finalPrice || orderDetails.finalPrice === "") {
    throw new ServerError(ErrorType.INVALID_FINAL_PRICE);
    }
    if (!orderDetails.deliveryDate || orderDetails.deliveryDate === "") {
    throw new ServerError(ErrorType.INVALID_ORDER_DELIVERY_DATE);
    }
    if (!orderDetails.paymentLastDigit || orderDetails.paymentLastDigit === "") {
    throw new ServerError(ErrorType.INVALID_PAYMENT_LAST_DIGITS);
    }
    if (!orderDetails.deliveryCity || orderDetails.deliveryCity === "") {
    throw new ServerError(ErrorType.INVALID_ORDER_DELIVERY_CITY);
    }
    if (!orderDetails.deliveryStreet || orderDetails.deliveryStreet === "") {
    throw new ServerError(ErrorType.INVALID_ORDER_DELIVERY_STREET);
    }
    
  }

  
  async function getOrdersList() {
    return await ordersDao.getOrdersList();
}
 
  module.exports = {
    addOrderData,
    getOrdersList
  }