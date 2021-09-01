const express = require("express");
const router = express.Router();
const url = require("url");

/* SIGN IN ROUTER
/users/auth/register
{
  username,
  password 
}
*/
router.post("/auth/login", async function (req, res) {
  await setTimeout(() => {
    console.log("1");
  }, 3000);

  await console.log(2);

  await res.send("OK");
});

module.exports = router;
