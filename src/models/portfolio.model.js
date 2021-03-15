const mongoose = require("mongoose");

const PortfolioSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  coin: {
    type: String,
    required: true,
    unique: true,
  },
  unit: {
    type: Number,
    required: true,
    min: 0,
  },
  created_at: {
    type: Date,
    required: true,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const Portfolio = mongoose.model("Coin", PortfolioSchema);

module.exports = Portfolio;
