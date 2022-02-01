let usersDao = require("../dao/users-dao");
let ServerError = require("../errors/server-error");
let ErrorType = require("../errors/error-type");
const crypto = require("crypto");
const saltRight = "sdkjfhdskajh";
const saltLeft = "--mnlcfs;@!$";
const jwt = require('jsonwebtoken');
const config = require('../config.json');
const usersCache = require("../dao/cache-module");


async function addUser(registrationData) {
  // Validations
  registrationData.password = crypto.createHash("md5").update(saltLeft + registrationData.password + saltRight).digest("hex");
  console.log("Hashed password: " + registrationData.password);
  
  await validateUserDetails(registrationData); 
  return await usersDao.addUser(registrationData);
}

async function validateUserDetails(registrationData) {
  if (!registrationData.email || registrationData.email === "") {
    throw new ServerError(ErrorType.INVALID_USER_EMAIL);
  }
  if (!registrationData.password || registrationData.password === "") {
    throw new Error(ErrorType.INVALID_PASSWORD);
  }
}



async function getLastPurchaseDate(id) {
  return  await usersDao.getLastPurchaseDate(id);
}


async function login(user) {
  console.log(user,'user')
  user.password = crypto.createHash("md5").update(saltLeft + user.password + saltRight).digest("hex");
  let userLoginData = await usersDao.login(user);
  
  // Do something with cache and stuff.. token....
  // const token = jwt.sign({sub: user.email}, config.secret, { expiresIn: "7d" });
  const token = jwt.sign({sub: user.email}, config.secret);

  usersCache.set(token, userLoginData);

  return { token, userType: userLoginData.type, firstname: userLoginData.name };
}

async function getUserCity(userId) {
    return await usersDao.getUserCity(userId);
}


async function getUserStreet(userId) {
  return await usersDao.getUserStreet(userId);
}

async function checkUniqueId(id) {
  return await usersDao.checkUniqueId(id);
}

async function checkUniqueEmail(email){
  return await usersDao.checkUniqueEmail(email);
}

module.exports = {
  addUser,
  login,
  getLastPurchaseDate,
  getUserCity,
  getUserStreet,
  checkUniqueId,
  checkUniqueEmail
};
