const mongoose = require("mongoose");

const WatchlistSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  watchlist: [
    {
      coin: { type: String, required: true },
      currentPrice: { type: Number, required: true, min: 0 },
      created_at: { type: Date, required: true, default: Date.now },
      updated_at: { type: Date, required: true, default: Date.now },
    },
  ],
});

const Watchlist = mongoose.model("Watchlist", WatchlistSchema);

module.exports = Watchlist;
