const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ScoreSchema = new Schema(
  {
    userID: {
      type: String,
      required: true,
    },
    seconds: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Score = new mongoose.model("Score", ScoreSchema);

module.exports = Score;
