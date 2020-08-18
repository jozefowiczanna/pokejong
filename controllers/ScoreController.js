const Score = require("../models/ScoreModel");
const User = require("../models/UserModel");

const score = {
  addScore: (req, res) => {
    console.log(req.body);
    const newScore = new Score({
      userID: req.body.userID,
      seconds: req.body.seconds,
      cols: req.body.cols,
      rows: req.body.rows,
    });
    newScore
      .save()
      .then((score) => res.json(score))
      .catch((err) => {
        console.log(err);
        return res.status(500).json({ server: "Internal server error" });
      });
  },
  getUserScores: (req, res) => {
    Score.find({"userID": req.params.id})
    .then((scores) => res.json(scores))
    .catch((err) => {
      console.log(err);
      return res.status(500).json({server: "Internal server error"})
    })
  },
  getAllScores: async (req, res) => { 
    try { 
      const users = await User.find({}); 
      const scores = await Score.find({}).sort({seconds: 1}).limit(10); 
      const joined = scores.map(score => { 
        users.filter(user => { 
          if (user._id.toString() === score.userID) { 
            score.userID = user.username 
          } 
        }) 
        return score; 
      }) 
      return res.json(joined) 
    } catch(err) { 
      console.log(err); 
      return res.status(500).json({server: "Internal server error"}) 
    } 
  }
};

module.exports = score;
