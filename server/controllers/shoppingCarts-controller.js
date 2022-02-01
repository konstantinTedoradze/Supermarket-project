let shoppingCartsLogic = require("../logic/shoppingCarts-logic");
const express = require("express");
const router = express.Router();
const cachModule = require("../dao/cache-module");

router.delete("/cartItem/:id", async (request, response, next) => {
  const cartItemId = request.params.id;
  console.log("deleteiD",cartItemId);
  try {
    const delteCartItem = await shoppingCartsLogic.deleteCartItem(cartItemId);
    console.log(delteCartItem);
    response.json();
  } catch (error) {
    return next(error);
  }
});

router.get("/cartItems", async (request, response, next) => {
  const userDetails = cachModule.extractUserDataFromCache(request);
  try {
    const shoppingCartDetails = await shoppingCartsLogic.getShoppingCartId(userDetails.id);
    let shoppingCartId = shoppingCartDetails[0].id;
    const cartItems = await shoppingCartsLogic.getAllcartItems(shoppingCartId);
    response.json(cartItems);
  } catch (error) {
    return next(error);
  }
});



router.post("/:id", async (request, response, next) => {
    const userDetails = cachModule.extractUserDataFromCache(request);
    const productId = request.params.id;
    const productQuantity = request.body.quantity;
    console.log(userDetails.id,productId,productQuantity,'0580000000000000000');
    try {
      const shoppingCartDetails = await shoppingCartsLogic.getShoppingCartId(userDetails.id);
      console.log(shoppingCartDetails[0].id,"77777777777777777777777");
      let shoppingCartId = shoppingCartDetails[0].id;
      const cartItem = await shoppingCartsLogic.getCurrentCartItem(productId,productQuantity,shoppingCartId);
      console.log(cartItem,"cartItemmmm");
      response.json();
    } catch (error) {
      return next(error);
    }
});
  
router.get("/getlastCartDate", async (request, response, next) => {
  try {
    const userDetails = cachModule.extractUserDataFromCache(request);
    console.log(userDetails,"kkkkkkkkk");
    const shoppingCartDetails = await shoppingCartsLogic.getShoppingCartId(userDetails.id);
    let shoppingCartId = shoppingCartDetails[0].id;
    const getlastCartDate = await shoppingCartsLogic.getLastCartDate(shoppingCartId);
    response.json(getlastCartDate);
  } catch (error) {
    return next(error);
  }
});
  
  module.exports = router;