const adminLogic = require('../logic/admin-logic');
const express = require("express");
const router = express.Router();
const cachModule = require("../dao/cache-module");


router.post("/createNewProduct", async (request, response, next) => {
    // Extracting the JSON from the packet's BODY
    let body = request.body;
    console.log('bodyyyyyyyy:', body);
    let categoryName = body.category;
    try {
        let categoryId = await adminLogic.getCategoryId(categoryName);
        console.log(categoryId[0],"gigilooooo");
        let newProductDetails = {
            productName: body.productName,
            price: body.price,
            picture: body.picture,
            category: categoryId[0].id
        }
        let newProdactData = await adminLogic.addNewProduct(newProductDetails);
        console.log("orderData:", newProdactData);
    
        response.send();
    } catch (error) {
      return next(error);
    }
});

router.put("/updateProduct", async (request, response, next) => {
    let body = request.body;
    console.log(body,'updateeeeeeeeeeeeeeeee');
    let categoryName = body.category;

    try {
        let categoryId = await adminLogic.getCategoryId(categoryName);
        console.log(categoryId[0],"gigilooooo");
        let productDetails = {
            id: body.id,
            productName: body.name,
            price: body.price,
            picture: body.picture,
            category: categoryId[0].id
        }
        console.log(productDetails,'7777777777777777777777');
        let updatedProductDetails = await adminLogic.updateProduct(productDetails);
        console.log(updatedProductDetails,'jkojiojojeijoasdf');
        response.send();
    }catch(error) {
        return next(error);
    }
});

module.exports = router;