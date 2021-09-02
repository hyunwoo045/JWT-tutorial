const mysql = require("mysql");
const dbconfig = require("../key/dbconfig");
const conn = mysql.createConnection(dbconfig);

const User = {
  create: (username, password) => {
    return new Promise((resolve, reject) => {
      conn.query(
        "INSERT INTO user (username, password) VALUES (?, ?);",
        [username, password],
        (err) => {
          if (err) reject(err);
          else {
            resolve();
          }
        }
      );
    });
  },
  verify: (username, password) => {
    return new Promise(function (resolve, reject) {
      conn.query(
        "SELECT password FROM user WHERE username=?",
        [username],
        (err, result) => {
          if (err) reject(err);
          else {
            if (result[0].password === password) resolve();
            else reject("WRONG PASSWORD");
          }
        }
      );
    });
  },
  findOneByUsername: (username) => {
    return new Promise((resolve, reject) => {
      conn.query(
        "SELECT COUNT(*) AS length FROM user WHERE username=?",
        [username],
        (err, result) => {
          if (err) reject(err);
          else {
            if (result[0].length !== 0) reject("INVALID USERNAME");
            else resolve();
          }
        }
      );
    });
  },
};

module.exports = User;
