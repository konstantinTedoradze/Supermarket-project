let connection = require("./connection-wrapper");
let ErrorType = require("./../errors/error-type");
let ServerError = require("./../errors/server-error");


async function addUser(user) {
    let sql = `INSERT INTO users (id,name,surname,email,password,city,street)  
    values(?, ?, ?, ?, ?, ?, ?)`;

    let parameters = [user.id,
        user.username, 
        user.surname, 
        user.email, 
        user.password,
        user.city, 
        user.street
    ];
        
    try {
      return await connection.executeWithParameters(sql, parameters);
    }
    catch (e) {
         console.log('koteeeeeeeeeeeeeeeeee');
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
    }
}


async function getLastPurchaseDate(id) {
    let sql = " SELECT  max(order_date) as date from orders WHERE user_id = ?";
    let parameters = [id];
    try {
        let lastDate = await connection.executeWithParameters(sql, parameters);
        console.log(lastDate);
        return lastDate[0].date;
    } catch(e) {
        throw new ServerError(ErrorType.LAST_PURCHASE_DATE, sql, e);
    }
}


async function isUserExist(registrationData) {
    // check if user exist in DB
    const sql = `SELECT * FROM onlineshop.users where email = ? `;
    
    let parameters = [registrationData.email];
    
    try {
      const existingUser = await connection.executeWithParameters(sql, parameters);
      return existingUser.length !== 0 ? true : false;
    } catch (e) {
      throw new ServerError(
        ErrorType.GENERAL_ERROR,
        JSON.stringify(registrationData),
        e
      );
    }
  }

async function login(user) {
    // UNCOMMENT IN ORDER TO SEE A GENERAL ERROR EXAMPLE
    let sql = "SELECT id,name,type,city,street FROM users where email = ? and password = ?";

    let parameters = [user.email, user.password];
    let usersLoginResult;

    try {
        usersLoginResult = await connection.executeWithParameters(sql, parameters);
    }
    catch (e) {
        // This is an example, for a situation where a TECHNICAL ERROR HAD OCCURED
        // that error threw an exception - WHICH WE WANT TO WRAP with a ServerError
        throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(user), e);
    }

    // A functional (!) issue which means - the userName + password do not match
    if (usersLoginResult == null || usersLoginResult.length == 0) {
        throw new ServerError(ErrorType.UNAUTHORIZED);
    }

    return usersLoginResult[0];
}

async function getUserCity(userId) {

    let sql = "SELECT city FROM users WHERE id = ?";

    let parameters = [userId];

    try {
        return await connection.executeWithParameters(sql, parameters);
      }
      catch (e) {
          throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
    }

}

async function getUserStreet(userId) {

    let sql = "SELECT street FROM users WHERE id = ?";

    let parameters = [userId];

    try {
        return await connection.executeWithParameters(sql, parameters);
      }
      catch (e) {
          throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
    }

}



async function checkUniqueId(newId) {

    let sql = "SELECT id FROM users WHERE id = ?";

    let parameters = [newId];

    try {
        console.log(parameters,'iddddddddddddddddddddddddddddd');
        let answer = await connection.executeWithParameters(sql, parameters);
        console.log(answer[0],"answer of id uniqueeeeee");
        if(answer[0] === undefined) {
            console.log('trueeeeeeeeee')
            return true; 
        } else {
            console.log('falseeeee');
            return false;
        }
      }
      catch (e) {
          throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
    }

}



async function checkUniqueEmail(newEmail) {

    let sql = "SELECT email FROM users WHERE email = ?";

    let parameters = [newEmail];

    try {
        console.log(parameters,'iddddddddddddddddddddddddddddd');
        let answer = await connection.executeWithParameters(sql, parameters);
        console.log(answer[0],"answer of email uniqueeeeee");
        if(answer[0] === undefined) {
            console.log('trueeeeeeeeee')
            return true; 
        } else {
            console.log('falseeeee');
            return false;
        }
      }
      catch (e) {
          throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
    }

}

module.exports = {
    addUser,
    login,
    isUserExist,
    getLastPurchaseDate,
    getUserCity,
    getUserStreet,
    checkUniqueId,
    checkUniqueEmail
};