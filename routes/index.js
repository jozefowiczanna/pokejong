const express = require("express");
const router = express.Router();
const { user, score } = require("../controllers");

router.get("/user", user.getAllUsers);
router.post("/user/register", user.registerUser);
router.post("/user/login", user.loginUser);

router.post("/game/score", score.addScore);

module.exports = router;
