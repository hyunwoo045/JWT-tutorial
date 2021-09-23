const jwt = require("jsonwebtoken");
const secretKey = require("../key/jwtconfig");
const secret = secretKey.secret;
const option = secretKey.option;

const JWTController = {
  generate: (payload) => {
    return new Promise((resolve, reject) => {
      jwt.sign(payload, secret, option, (err, token) => {
        console.log(token);
        if (err) reject(err);
        resolve(token);
      });
    });
  },
  verify: (token) => {
    return new Promise((resolve, reject) => {
      if (!token) reject("NOT LOGGED IN");
      jwt.verify(token, secret, (err, decoded) => {
        if (err) reject("INVALID_TOKEN");
        resolve(decoded);
      });
    });
  },
};

module.exports = JWTController;
