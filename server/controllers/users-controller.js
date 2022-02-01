let usersLogic = require("../logic/users-logic");
const express = require("express");
const shoppingCartsLogic = require("../logic/shoppingCarts-logic");
const router = express.Router();
const cachModule = require("../dao/cache-module");


// POST http://localhost:3001/users/login
router.post("/login", async (request, response, next) => {
  let user = request.body;
  try {
    let successfullLoginData = await usersLogic.login(user);
    console.log("controller", successfullLoginData);

    response.send(successfullLoginData);
  } catch (error) {
    return next(error);
  }
});

router.get("/city", async (request, response, next) => {
  try {
    console.log(request.headers.authorization,"reqqqqqqqqqqqqqqqqqqqqq");
    const userDetails = cachModule.extractUserDataFromCache(request);
    const userCity = await usersLogic.getUserCity(userDetails.id);
    console.log(userDetails.id, "userId");
    response.json(userCity);
  } catch (error) {
    return next(error);
  }
});

router.get("/street", async (request, response, next) => {
  try {
    console.log(request.headers.authorization,"reqqqqqqqqqqqqqqqqqqqqq");
    const userDetails = cachModule.extractUserDataFromCache(request);
    const usersStreet = await usersLogic.getUserStreet(userDetails.id);
    console.log(userDetails.id, "userId");
    response.json(usersStreet);
  } catch (error) {
    return next(error);
  }
});

router.get("/uniqueEmail/:email", async (request, response, next) => {
  let email = request.params.email;
  console.log(email,"body");
  try {
    const uniqueEmail = await usersLogic.checkUniqueEmail(email);
    response.json(uniqueEmail);
  } catch (error) {
    return next(error);
  }
});


router.get("/unique/:id", async (request, response, next) => {
  let id = request.params.id;
  console.log(id);
  try {
    const uniqueId = await usersLogic.checkUniqueId(id);
    response.json(uniqueId);
  } catch (error) {
    return next(error);
  }
});

// ADD USER
// POST http://localhost:3001/users
router.post("/", async (request, response, next) => {
  console.log(request.body, "request body");
  let registrationData = request.body;
  let loginData = { ...registrationData };

  try {
    let successfullRegisterData = await usersLogic.addUser(registrationData);
    let user = {
      email: loginData.email,
      password: loginData.password,
    };
    console.log(user, "iuseeeer");
    await shoppingCartsLogic.addShoppingCart(registrationData.id);
    let successfullLoginData;
    if (successfullRegisterData) {
      successfullLoginData = await usersLogic.login(user);
    }
    console.log(successfullLoginData, "successfullogindadra");
    response.send(successfullLoginData);
  } catch (error) {
    return next(error);
  }
});

router.get("/getLastPurchaseDate", async (request, response, next) => {
    try {
      const userDetails = cachModule.extractUserDataFromCache(request);
      console.log(userDetails,"kkkkkkkkk");
      const lastPurchaseDate = await usersLogic.getLastPurchaseDate(userDetails.id);
      response.json(lastPurchaseDate);
    } catch (error) {
      return next(error);
    }
});





module.exports = router;
