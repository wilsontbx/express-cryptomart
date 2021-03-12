const mongoose = require("mongoose");

const PortfolioSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  coin: [
    {
      coin: { type: String, required: true },
      currentPrice: { type: Number, required: true, min: 0 },
      currentUnit: { type: Number, required: true, min: 0 },
      created_at: { type: Date, required: true, default: Date.now },
      updated_at: { type: Date, required: true, default: Date.now },
    },
  ],
  watchlist: [
    {
      coin: { type: String, required: true },
      created_at: { type: Date, required: true, default: Date.now },
      updated_at: { type: Date, required: true, default: Date.now },
    },
  ],
});

const Portfolio = mongoose.model("Portfolio", PortfolioSchema);

module.exports = Portfolio;
