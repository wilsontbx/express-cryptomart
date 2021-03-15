const mongoose = require("mongoose");

const PortfolioSchema = new mongoose.Schema(
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
    unit: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { timestamps: true }
);

const Portfolio = mongoose.model("Portfolio", PortfolioSchema);

module.exports = Portfolio;
