const express = require("express");
const router = express.Router();

router.get("/user", (req, res) => {
  res.send("you are on a user route");
});

module.exports = router;
