const express = require("express");
const router = express.Router();
const { user } = require("../controllers");

router.get("/user", user.getAllUsers);
router.post("/user/register", user.registerUser);
router.post("/user/login", user.loginUser);

module.exports = router;
