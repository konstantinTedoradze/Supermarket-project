const orderLogic = require('../logic/order-logic');
const express = require("express");
const shoppingCartsLogic = require("../logic/shoppingCarts-logic");
const router = express.Router();
const cachModule = require("../dao/cache-module");


router.post("/", async (request, response, next) => {
    // Extracting the JSON from the packet's BODY
    let body = request.body;
    console.log('bodyyyyyyyy:', body);
    const userDetails = cachModule.extractUserDataFromCache(request);
    try {
        const shoppingCartDetails = await shoppingCartsLogic.getShoppingCartId(userDetails.id);
        let shoppingCartId = shoppingCartDetails[0].id;
        let orderDetails = {
            userId: userDetails.id,
            shoppingCartId:  shoppingCartId,
            finalPrice: body.sum,
            deliveryDate: body.deliveryDate,
            paymentLastDigit: body.lastDigit,
            deliveryCity: body.deliveryCity,
            deliveryStreet: body.deliveryStreet
        }
        let orderData = await orderLogic.addOrderData(orderDetails);
        console.log("orderData:", orderData);
        if(orderData){
            let deleteItemsFromShopingCart = await shoppingCartsLogic.deleteCurrentItems(shoppingCartId);
        }
        response.send();
    } catch (error) {
      return next(error);
    }
});


router.get("/length", async (request, response, next) => {
    try {
        const ordersList = await orderLogic.getOrdersList();
        response.json(ordersList.length);
      } catch (error) {
        return next(error);
      }
});

module.exports = router;