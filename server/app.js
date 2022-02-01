const express = require("express");
const usersController = require("./controllers/users-controller");
const productsController = require("./controllers/products-controller");
const shoppingCartsController = require("./controllers/shoppingCarts-controller");
const ordersController = require("./controllers/order-controller");
const adminController = require("./controllers/admin-controller");
const errorHandler = require("./errors/error-handler");
const server = express();
const cors = require('cors');
const loginFilter = require('./middleware/login-filter');
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');


server.use(cors({ origin: "http://localhost:4200"}));

// Middlewares init
server.use(loginFilter());

// Extract the JSON from the body and create request.body object containing it: 
server.use(express.json());

server.use("/users", usersController);
server.use("/products",productsController);
server.use("/shoppingCarts", shoppingCartsController);
server.use("/orders",ordersController);
server.use("/admin",adminController);
server.use(errorHandler);

server.use("/uploads", express.static(__dirname + "/uploads"));

server.post("/uploads", async (req, res) => {
    let form = new formidable.IncomingForm();
    form.parse(req);
  
    form.on("fileBegin", function (name, file) {
      file.path = __dirname + "/uploads/" + file.name;
    });
  
    form.on("file", function (name, file) {
      res.send("file successfully uploaded");
    });
    form.on("error", function (error) {
      res.send(500);
    });
  
});

server.post('/download', async (req,res) => {
  
    let body = req.body.item;
    let text = "Your Order In Mymarket\n" + new Date() + "\n";
    let totalPrice = req.body.sum;
    console.log(body,'kkkssssssssssssss');
    for (let i = 0; i < body.length;i++) {
      text += '* ' + body[i].name +", " +body[i].quantity+ "pcs " + " - " + body[i].price + "₪"+ "\n";
    }
    text += "\n" + "Total Price: " + totalPrice+"₪";

  fs.writeFile(__dirname + '/downloads/' + 'orderFile.txt', text, (err) => {
        if (err) throw err;
          console.log('Saved!');
        
        let filepath= path.join(__dirname, "/downloads/",'orderFile.txt');
        console.log(filepath)
        res.contentType('text/plain');
        res.setHeader('Content-disposition', 'attachment; filename=orderFile.txt');
        res.sendFile(filepath);
  })
});

server.listen(3001, () => console.log("Listening on http://localhost:3001"));