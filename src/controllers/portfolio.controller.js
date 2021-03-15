const PortfolioModel = require("../models/portfolio.model");
const UserModel = require("../models/user.model");
const HistoryModel = require("../models/history.model");

const checkWallet = async (username, trade, next) => {
  try {
    const newUpdate = await UserModel.findOne(
      {
        username: username,
        wallet: { $gte: -trade },
      },
      {
        new: true,
        runValidators: true,
      }
    );
    // if money not enough newUpdate will equal to null
    if (!newUpdate) {
      const err = new Error("Wallet not enough");
      next(err);
      return;
    }
    return newUpdate;
  } catch (err) {
    next(err);
  }
};

const checkWalletAndTrade = async (username, trade, next) => {
  try {
    const newUpdate = await UserModel.findOneAndUpdate(
      {
        username: username,
        wallet: { $gte: -trade },
      },
      { $inc: { wallet: trade } },
      {
        new: true,
        runValidators: true,
      }
    );
    // if money not enough newUpdate will equal to null
    if (!newUpdate) {
      const err = new Error("Wallet not enough/ error in wallet update");
      next(err);
      return;
    }
    return newUpdate;
  } catch (err) {
    next(err);
  }
};

const updateHistory = async (portfolio, next) => {
  const { username, coin, unit, price } = portfolio;
  let type;
  if (portfolio.unit > 0) {
    type = "buy";
  } else {
    type = "sell";
  }
  try {
    const newHistory = await HistoryModel.findOneAndUpdate(
      {
        username: username,
      },
      {
        $push: {
          history: {
            type: type,
            coin: coin,
            price: price,
            unit: unit,
          },
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!newHistory) {
      const err = new Error("History unable update");
      next(err);
      return;
    }
    return newHistory;
  } catch (err) {
    next(err);
  }
};

const PortfolioControllers = {
  getPortfolio: async (username, next) => {
    try {
      const portfolio = await PortfolioModel.find({ username: username }).sort({
        updatedAt: 1,
      });
      return portfolio;
    } catch (err) {
      next(err);
    }
  },
  newCoin: async (portfolio, next) => {
    const { username, unit, price, trade } = portfolio;
    try {
      if (unit <= 0 || price <= 0) {
        const err = new Error("Unit or price number is negative or zero");
        next(err);
        return;
      }
      await checkWallet(username, trade, next);
      const newPortfolio = new PortfolioModel(portfolio);
      const walletUpdate = await checkWalletAndTrade(username, trade, next);
      await newPortfolio.save();
      await updateHistory(portfolio, next);
      return { newPortfolio, walletUpdate };
    } catch (err) {
      next(err);
    }
  },
  tradeCoin: async (portfolio, next) => {
    const { username, coin, unit, price, trade } = portfolio;
    try {
      if (price <= 0) {
        const err = new Error("Price is negative");
        next(err);
        return;
      }

      await checkWallet(username, trade, next);
      const editPortfolio = await PortfolioModel.findOneAndUpdate(
        { username: username, coin: coin, unit: { $gt: 0 } },
        { $inc: { unit: unit } },
        {
          new: true,
          runValidators: true,
        }
      );

      if (!editPortfolio) {
        const err = new Error("Unit not enough to sell/Portfolio not found");
        next(err);
        return;
      }
      const walletUpdate = await checkWalletAndTrade(username, trade, next);
      await updateHistory(portfolio, next);
      return { editPortfolio, walletUpdate };
    } catch (err) {
      next(err);
    }
  },
  sellCoin: async (portfolio, next) => {
    const { username, coin, unit, price, trade } = portfolio;
    try {
      if (unit >= 0 || price <= 0) {
        const err = new Error("Unit not is for sell");
        next(err);
        return;
      }
      const deletePortfolio = await PortfolioModel.findOneAndDelete({
        username: username,
        coin: coin,
        unit: { $eq: -unit },
      });

      if (!deletePortfolio) {
        const err = new Error("Unit not enough to sell/Portfolio not found");
        next(err);
        return;
      }
      const walletUpdate = await checkWalletAndTrade(username, trade, next);
      await updateHistory(portfolio, next);
      return { deletePortfolio, walletUpdate };
    } catch (err) {
      next(err);
    }
  },
  getHistory: async (username, next) => {
    try {
      const history = await HistoryModel.find({ username: username });
      return history;
    } catch (err) {
      next(err);
    }
  },
};

module.exports = PortfolioControllers;
