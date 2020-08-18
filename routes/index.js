const express = require("express");
const router = express.Router();
const { user, score } = require("../controllers");

router.post("/user/register", user.registerUser);
router.post("/user/login", user.loginUser);
router.get("/user/:id", score.getUserScores);

router.post("/game/score", score.addScore);
router.get("/scores", score.getAllScores)

module.exports = router;
