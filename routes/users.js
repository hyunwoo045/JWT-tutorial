const express = require("express");
const mysql = require("mysql");
const router = express.Router();
const url = require("url");

const User = require("../models/user");
const JWTController = require("../models/token");

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    await User.verify(username, password);
    const token = await JWTController.generate({ username });
    res.send({
      message: "Logged in successfully",
      token,
    });
  } catch (err) {
    res.send(err);
  }
});

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    await User.findOneByUsername(username);
    await User.create(username, password);

    res.send("REGISTED!");
  } catch (error) {
    res.send(error);
  }
});

router.get("/check", async (req, res) => {
  const _url = req.url;
  const queryData = url.parse(_url, true).query;
  const token = queryData.token;
  console.log(token);
  try {
    const decoded = await JWTController.verify(token);
    res.send({
      message: "Valid token",
      token,
      decoded,
    });
  } catch (err) {
    res.send(err);
  }
});
module.exports = router;
