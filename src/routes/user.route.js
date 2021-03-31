const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const createJWTToken = require("../config/jwt");
const UserModel = require("../models/user.model");
const HistoryModel = require("../models/history.model");
const protectRoute = require("../middleware/protectorRoute");

router.post("/register", async (req, res, next) => {
  try {
    const user = new UserModel(req.body);
    const newUser = await user.save();
    const history = new HistoryModel(req.body);
    const newhistory = await history.save();
    res.status(201).json({ success: true, newUser, newhistory });
  } catch (err) {
    next(err);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username: username });
    const result = await bcrypt.compare(password, user.password);
    if (!result) {
      throw new Error("Login failed");
      next(err);
    }

    const token = createJWTToken(user.username);

    const oneDay = 24 * 60 * 60 * 1000;
    // const oneWeek = oneDay * 7;
    const expiryDate = new Date(Date.now() + oneDay);

    res.cookie("token", token, {
      expires: expiryDate,
      httpOnly: true, // client-side js cannot access cookie info
      secure: true, // use HTTPS
    });

    res.status(200).json({
      success: true,
      token,
      expiryDate,
      info: {
        firstname: user.firstname,
        lastname: user.lastname,
        username: user.username,
        email: user.email,
        wallet: user.wallet,
      },
    });
  } catch (err) {
    if (err.message === "Login failed") {
      err.statusCode = 400;
    }
    next(err);
  }
});

router.post("/info", protectRoute, async (req, res, next) => {
  try {
    const { username } = req.body;
    const user = await UserModel.findOne({ username: username });

    res.status(200).json({
      success: true,
      info: {
        firstname: user.firstname,
        lastname: user.lastname,
        username: user.username,
        email: user.email,
        wallet: user.wallet,
      },
    });
  } catch (err) {
    if (err.message === "info failed") {
      err.statusCode = 400;
    }
    next(err);
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie("token").send("You are now logged out!");
});

router.use((err, req, res, next) => {
  res.statusCode = err.statusCode || 500;
  res.send(`${err}`);
});

module.exports = router;
