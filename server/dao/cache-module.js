let tokenToUserDetailsMap = new Map();

async function get(token) {
  if (token == null) {
    throw new Error("Invalid key, failed to retrieve data from cache");
  }
  return tokenToUserDetailsMap.get(token);
}

async function set(token, userData) {
  tokenToUserDetailsMap.set(token, userData);
  console.log(tokenToUserDetailsMap, "toketouserDetails");
}

// This function should be in a separate module, because many resources will use it
function extractUserDataFromCache(request) {
  let authorizationString = request.headers["authorization"];
  // Removing the bearer prefix, leaving the clean token
  let token = authorizationString.substring("Bearer ".length);
  console.log(token,'token');
  let userData = tokenToUserDetailsMap.get(token);
  console.log(userData, 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
  return userData;
}

module.exports = {
  set,
  get,
  extractUserDataFromCache,
};
