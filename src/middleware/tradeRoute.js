const tradeRoute = (req, res, next) => {
  const { unit, price, trade } = req.body;
  try {
    if ((Number(unit) * Number(price)).toFixed(2) !== -Number(trade)) {
      const err = new Error("trade amount is wrong");
      next(err);
    } else {
      next();
    }
  } catch (err) {
    err.statusCode = 401;
    next(err);
  }
};

module.exports = tradeRoute;
