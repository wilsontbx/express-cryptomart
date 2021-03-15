const express = require("express");
const router = express.Router();
const PortfolioControllers = require("../controllers/portfolio.controller");
const protectRoute = require("../middleware/protectorRoute");

//route
router.get("/:username", async (req, res, next) => {
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

router.post("/", async (req, res, next) => {
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

router.patch("/", async (req, res, next) => {
  try {
    const editPortfolio = await PortfolioControllers.tradeCoin(req.body, next);
    res.status(200).json({
      success: true,
      result: editPortfolio,
    });
  } catch (err) {
    next(err);
  }
});

router.delete("/", async (req, res, next) => {
  try {
    const editPortfolio = await PortfolioControllers.tradeCoin(req.body, next);
    res.status(200).json({
      success: true,
      result: editPortfolio,
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
