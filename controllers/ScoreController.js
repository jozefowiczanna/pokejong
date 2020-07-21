const Score = require("../models/ScoreModel");

const score = {
  addScore: (req, res) => {
    console.log(req.body);
    const newScore = new Score({
      userID: req.body.userID,
      seconds: req.body.seconds,
    });
    newScore
      .save()
      .then((score) => res.json(score))
      .catch((err) => {
        console.log(err);
        return res.status(500).json({ server: "Internal server error" });
      });
  },
};

module.exports = score;
