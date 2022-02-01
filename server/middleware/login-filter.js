const expressJwt = require("express-jwt");
const config = require("../config.json");

// Extracting the text from the secret's JSON
let { secret } = config;

let whiteListUrls = new Set();
whiteListUrls.add("/users/login");
whiteListUrls.add("/orders/length");
whiteListUrls.add("/products");

function authenticateJwtRequestToken() {
  return expressJwt({ secret, algorithms: ["sha1", "RS256", "HS256"] }).unless(
    (request) => {
      // console.log(request.headers, "request");
      console.log("request.url = " + request.url);

      const dynamicParamsCheck = /^\/users\/unique\/.*/;
      const dynamicParamsCheckEmail = /^\/users\/uniqueEmail\/.*/;
      if (request.method == "GET" && dynamicParamsCheck.test(request.url) || 
      dynamicParamsCheckEmail.test(request.url)) {
        console.log("Returned true");
        return true;
      }

      if (
        (request.method == "POST" && request.url.endsWith("/users/")) ||
        request.url.startsWith("/uploads")
      ) {
        console.log("Returned true");
        return true;
      }

      // If the url resides in our whitelist urls
      if (whiteListUrls.has(request.url)) {
        return true;
      }

      return false;
    }
  );
}

module.exports = authenticateJwtRequestToken;
