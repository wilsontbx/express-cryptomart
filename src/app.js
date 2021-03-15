const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");

app.use(cookieParser());
app.use(express.json());

const devurl = "http://localhost:3000";
const produrl = "https://cryptomart-app.netlify.app";
app.use(
  cors({
    origin: process.env.NODE_ENV === "development" ? devurl : produrl,
  })
);

app.options("*", cors());
const requireJsonContent = (req, res, next) => {
  if (req.headers["content-type"] !== "application/json") {
    res.status(400).send("Server wants application/json!");
  } else {
    next();
  }
};

app.get("/", (req, res) => {
  res.send("Welcome to Cryptomart api");
});

app.post("/", requireJsonContent, (req, res) => {
  res.status(201).send("Thanks for the JSON!");
});

const userRouter = require("./routes/user.route");
app.use("/user", userRouter);

const coinRouter = require("./routes/coin.route");
app.use("/coin", coinRouter);

const portfolioRouter = require("./routes/portfolio.route");
app.use("/portfolio", portfolioRouter);

const watchlistRouter = require("./routes/watchlist.route");
app.use("/watchlist", watchlistRouter);

module.exports = app;
