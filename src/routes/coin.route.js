const express = require("express");
const router = express.Router();
const CoinControllers = require("../controllers/coin.controller");

//route
router.get("/data", async (req, res, next) => {
  try {
    const allCoin = await CoinControllers.getData(next);
    res.status(200).json({
      success: true,
      result: allCoin,
    });
  } catch (err) {
    next(err);
  }
});

router.get("/meta/:symbol", async (req, res, next) => {
  const symbol = req.params.symbol.toLowerCase();
  try {
    const metaData = await CoinControllers.getMeta(symbol, next);
    res.status(200).json({
      success: true,
      result: metaData,
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
