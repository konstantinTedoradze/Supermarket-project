let connection = require("./connection-wrapper");
let ErrorType = require("./../errors/error-type");
let ServerError = require("./../errors/server-error");


async function addOrderData(orderDetails) {
    let sql = `INSERT INTO orders (user_id,shopping_cart_id,final_price,delivery_date,
        payment_last_digits,delivery_city,delivery_street)  values(?, ?, ?, ?, ?, ?, ?)`;

    let parameters = [
        orderDetails.userId,
        orderDetails.shoppingCartId,
        orderDetails.finalPrice,
        orderDetails.deliveryDate,
        orderDetails.paymentLastDigit,
        orderDetails.deliveryCity,
        orderDetails.deliveryStreet
    ];
        
    try {
        return await connection.executeWithParameters(sql, parameters);
    }
    catch (e) {
        console.log('leilakoooooo');
        throw new ServerError(ErrorType.ORDER_DATA_ERROR, sql, e);
    }
}

async function getOrdersList() {

    let sql = `SELECT COUNT(id) As length FROM orders`;

    try {
        let countOrders =  await connection.execute(sql);
        return countOrders[0];
    }catch(e){
        throw new ServerError(ErrorType.ORDER_LIST_ERROR, sql, e);
    }
}


module.exports = {
    addOrderData,
    getOrdersList
}