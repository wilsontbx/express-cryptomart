const jwt = require("jsonwebtoken");

const protectRoute = (req, res, next) => {
  try {
    if (!req.headers.token) {
      const err = new Error("You are not authorized");
      next(err);
    } else {
      req.user = jwt.verify(req.headers.token, process.env.JWT_SECRET_KEY);
      next();
    }
  } catch (err) {
    err.statusCode = 401;
    next(err);
  }
};

module.exports = protectRoute;
