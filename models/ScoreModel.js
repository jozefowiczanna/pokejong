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
    rows: {
      type: Number,
      required: true,
    },
    cols: {
      type: Number,
      required: true,
    },
    createdAt: {
      type: Date,
      default: new Date(),
      required: true,
    },
  }
);

const Score = new mongoose.model("Score", ScoreSchema);

module.exports = Score;
