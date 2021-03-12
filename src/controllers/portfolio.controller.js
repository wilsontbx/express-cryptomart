const PortfolioModel = require("../models/portfolio.model");
const UserModel = require("../models/user.model");

const PortfolioControllers = {
  getPortfolio: async (username, next) => {
    try {
      const portfolio = await PortfolioModel.find({ username: username }).sort({
        updated_at: 1,
      });
      return portfolio;
    } catch (err) {
      next(err);
    }
  },
  newCoin: async (portfolio, next) => {
    // const { username, coin, unit, spend } = portfolio;
    try {
      //   await UserModel.findOneAndUpdate({ username, username });
      const newPortfolio = new PortfolioModel(portfolio);
      await newPortfolio.save();
      return newPortfolio;
    } catch (err) {
      next(err);
    }
  },
  tradeCoin: async (portfolio, next) => {
    const { username, coin, unit, trade } = portfolio;
    try {
      //   const exist = await PortfolioModel.findOne({
      //     username: username,
      //     coin: coin,
      //   });
      //   const newUnit = exist.unit + unit;
      const editPortfolio = await PortfolioModel.findOneAndUpdate(
        { username: username, coin: coin },
        { $inc: { unit: unit } },
        {
          new: true,
          runValidators: true,
        }
      );
      return editPortfolio;
    } catch (err) {
      next(err);
    }
  },
  sellCoin: async (portfolio, next) => {
    // const { username, coin, unit, spend } = portfolio;
    try {
      const deletePortfolio = await PortfolioModel.findOneAndDelete({
        username: username,
        coin: coin,
      });
      return deletePortfolio;
    } catch (err) {
      next(err);
    }
  },
};

module.exports = PortfolioControllers;
