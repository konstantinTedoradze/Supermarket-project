let ErrorType = {
  GENERAL_ERROR: {
    id: 1,
    httpCode: 600,
    message:
      "A big fuck up which we'll never tell you of had just happend. And now : A big fat lie....'A general error ....'",
    isShowStackTrace: true,
  },
  USER_NAME_ALREADY_EXIST: {
    id: 2,
    httpCode: 601,
    message: "User name already exist",
    isShowStackTrace: false,
  },
  USER_EMAIL_ALREADY_EXIST: {
    id: 3,
    httpCode: 602,
    message: "Email already exist",
    isShowStackTrace: false,
  },
  UNAUTHORIZED: {
    id: 4,
    httpCode: 401,
    message: "Login failed, invalid email or password",
    isShowStackTrace: false,
  },
  INVALID_USER_EMAIL: {
    id: 5,
    httpCode: 402,
    message: "Invalid user name",
    isShowStackTrace: false,
  },
  INVALID_PASSWORD: {
    id: 6,
    httpCode: 403,
    message: "Invalid password",
    isShowStackTrace: false,
  },
  INVALID_ORDER_USERID: {
    id: 7,
    httpCode: 405,
    message: "Invalid order userId",
    isShowStackTrace: false,
  },
  INVALID_SHOPPING_CART_ID: {
    id: 8,
    httpCode: 406,
    message: "Invalid shopping cart id",
    isShowStackTrace: false,
  },
  INVALID_FINAL_PRICE: {
    id: 9,
    httpCode: 407,
    message: "Invalid final price",
    isShowStackTrace: false,
  },
  INVALID_ORDER_DATE: {
    id: 10,
    httpCode: 408,
    message: "Invalid Order date",
    isShowStackTrace: false,
  },
  INVALID_PAYMENT_LAST_DIGITS: {
    id: 12,
    httpCode: 411,
    message: "Invalid payment last digits",
    isShowStackTrace: false,
  },
  INVALID_ORDER_DELIVERY_CITY: {
    id: 13,
    httpCode: 412,
    message: "Invalid delivery City",
    isShowStackTrace: false,
  },
  INVALID_ORDER_DELIVERY_STREET: {
    id: 14,
    httpCode: 413,
    message: "Invalid delivery Street",
    isShowStackTrace: false,
  },
  ORDER_LIST_ERROR: {
    id: 15,
    httpCode: 414,
    message: "Invalid ORDER LIST",
    isShowStackTrace: false,
  },
  ORDER_DATA_ERROR: {
    id: 16,
    httpCode: 415,
    message: "Invalid ORDER DATA",
    isShowStackTrace: false,
  },
  PRODUCT_DATA_ERROR: {
    id: 17,
    httpCode: 416,
    message: "Invalid PRODUCT DATA",
    isShowStackTrace: false,
  },
  PRODUCT_DATA_ERROR_CATEGORY_NAME: {
    id: 18,
    httpCode: 417,
    message: "Invalid PRODUCT DATA BY CATEGORY NAME",
    isShowStackTrace: false,
  },
  PRODUCTS_BY_CATEGORY_ERROR: {
    id: 19,
    httpCode: 418,
    message: "Invalid PRODUCTS DATA BY CATEGORY",
    isShowStackTrace: false,
  },
  FILLTERED_PRODUCT_ERROR: {
    id: 20,
    httpCode: 419,
    message: "Invalid FILLTERED PRODUCT ERROR",
    isShowStackTrace: false,
  },
  ADD_SHOPPING_CART_ERROR: {
    id: 21,
    httpCode: 421,
    message: "Invalid TO ADD NEW SHOPPING CART ERROR",
    isShowStackTrace: false,
  },
  SHOPPING_CART_ID_ERROR: {
    id: 22,
    httpCode: 422,
    message: "Invalid TO GET SHOPPING CART ID",
    isShowStackTrace: false,
  },
  GURRENT_CART_ITEM_ERROR: {
    id: 23,
    httpCode: 423,
    message: "Invalid TO GET  GURRENT CART ITEM",
    isShowStackTrace: false,
  },
  DELETE_CART_ITEM_ERROR: {
    id: 24,
    httpCode: 424,
    message: "Invalid  DELETE CART ITEM",
    isShowStackTrace: false,
  },
  DELETE_CURRENT_ITEM_ERROR: {
    id: 25,
    httpCode: 425,
    message: "Invalid  DELETE CURRENT CART ITEM",
    isShowStackTrace: false,
  },
  UPDATE_PRODUCT_ERROR: {
    id: 26,
    httpCode: 426,
    message: "Invalid  UPDATE PRODUCT ERROR",
    isShowStackTrace: false,
  },
  INVALID_PRODUCT_NAME: {
    id: 27,
    httpCode: 427,
    message: "Invalid  PRODUCT NAME ERROR",
    isShowStackTrace: false,
  },
  INVALID_PRODUCT_CATEGORY: {
    id: 28,
    httpCode: 428,
    message: "Invalid  PRODUCT CATEGORY ERROR",
    isShowStackTrace: false,
  },
  INVALID_PRODUCT_PRICE: {
    id: 29,
    httpCode: 429,
    message: "Invalid  PRODUCT PRICE ERROR",
    isShowStackTrace: false,
  },
  INVALID_PRODUCT_PICTURE: {
    id: 30,
    httpCode: 430,
    message: "Invalid  PRODUCT PICTURE ERROR",
    isShowStackTrace: false,
  },
  LAST_PURCHASE_DATE: {
    id: 31,
    httpCode: 431,
    message: "Invalid  LAST PURCHASE DATE ERROR",
    isShowStackTrace: false,
  }

};

module.exports = ErrorType;
