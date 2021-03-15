const WatchlistModel = require("../models/watchlist.model");

const WatchlistControllers = {
  getWatchlist: async (username, next) => {
    try {
      const watchlist = await WatchlistModel.find({ username: username }).sort({
        updatedAt: 1,
      });
      return watchlist;
    } catch (err) {
      next(err);
    }
  },
  newWatchlist: async (watchlist, next) => {
    try {
      const newWatchlist = new WatchlistModel(watchlist);
      await newWatchlist.save();
      return newWatchlist;
    } catch (err) {
      next(err);
    }
  },
  updateWatchlist: async (watchlist, next) => {
    const { username, coin } = watchlist;
    try {
      const updateWatchlist = await WatchlistModel.findOneAndUpdate(
        {
          username: username,
          coin: coin,
        },
        {
          watchlist,
        }
      );
      return updateWatchlist;
    } catch (err) {
      next(err);
    }
  },
  deleteWatchlist: async (watchlist, next) => {
    const { username, coin } = watchlist;
    try {
      const deleteWatchlist = await WatchlistModel.findOneAndDelete({
        username: username,
        coin: coin,
      });
      return deleteWatchlist;
    } catch (err) {
      next(err);
    }
  },
};

module.exports = WatchlistControllers;
