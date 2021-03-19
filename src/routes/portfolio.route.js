const express = require("express");
const router = express.Router();
const PortfolioControllers = require("../controllers/portfolio.controller");
const protectRoute = require("../middleware/protectorRoute");
const tradeRoute = require("../middleware/tradeRoute");

//route
router.get("/history/:username", protectRoute, async (req, res, next) => {
  try {
    const history = await PortfolioControllers.getHistory(
      req.params.username,
      next
    );
    res.status(200).json({
      success: true,
      result: history,
    });
  } catch (err) {
    next(err);
  }
});

router.get("/:username", protectRoute, async (req, res, next) => {
  try {
    const portfolio = await PortfolioControllers.getPortfolio(
      req.params.username,
      next
    );
    res.status(200).json({
      success: true,
      result: portfolio,
    });
  } catch (err) {
    next(err);
  }
});

router.post("/", protectRoute, async (req, res, next) => {
  try {
    const newPortfolio = await PortfolioControllers.newCoin(req.body, next);
    res.status(201).json({
      success: true,
      result: newPortfolio,
    });
  } catch (err) {
    next(err);
  }
});

router.put("/", protectRoute, async (req, res, next) => {
  try {
    const tradePortfolio = await PortfolioControllers.tradeCoin(req.body, next);
    res.status(200).json({
      success: true,
      result: tradePortfolio,
    });
  } catch (err) {
    next(err);
  }
});

router.delete("/", protectRoute, async (req, res, next) => {
  try {
    const sellPortfolio = await PortfolioControllers.sellCoin(req.body, next);
    res.status(200).json({
      success: true,
      result: sellPortfolio,
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
