const mongoose = require("mongoose");

const WatchlistSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    coin: {
      type: String,
      required: true,
      unique: true,
    },
    currentPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    timeStamp: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const Watchlist = mongoose.model("Watchlist", WatchlistSchema);

module.exports = Watchlist;
