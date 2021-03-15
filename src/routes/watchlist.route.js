const express = require("express");
const router = express.Router();
const WatchlistControllers = require("../controllers/watchlist.controller");
const protectRoute = require("../middleware/protectorRoute");

//route
router.get("/:username", protectRoute, async (req, res, next) => {
  try {
    const watchlist = await WatchlistControllers.getWatchlist(
      req.params.username,
      next
    );
    res.status(200).json({
      success: true,
      result: watchlist,
    });
  } catch (err) {
    next(err);
  }
});

router.post("/", protectRoute, async (req, res, next) => {
  try {
    const newWatchlist = await WatchlistControllers.newWatchlist(
      req.body,
      next
    );
    res.status(201).json({
      success: true,
      result: newWatchlist,
    });
  } catch (err) {
    next(err);
  }
});

router.put("/", protectRoute, async (req, res, next) => {
  try {
    const editWatchlist = await WatchlistControllers.updateWatchlist(
      req.body,
      next
    );
    res.status(200).json({
      success: true,
      result: editWatchlist,
    });
  } catch (err) {
    next(err);
  }
});

router.delete("/", protectRoute, async (req, res, next) => {
  try {
    const deleteWatchlist = await WatchlistControllers.deleteWatchlist(
      req.body,
      next
    );
    res.status(200).json({
      success: true,
      result: deleteWatchlist,
    });
  } catch (err) {
    next(err);
  }
});

//validation
router.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  res.status(err.statusCode).send(err.message);
});

module.exports = router;
