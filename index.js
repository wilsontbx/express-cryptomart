require("dotenv").config();
const express = require("express");
const cors = require("cors");
const coinControllers = require("./controllers/coinControllers");
const app = express();
const port = process.env.PORT;

app.use(
    express.urlencoded({
        extended: true,
    })
);
const devurl = "http://localhost:3000";
const produrl = "https://cryptomart-app.netlify.app";
app.use(
    cors({
        origin: process.env.NODE_ENV === "development" ? devurl : produrl,
    })
);
app.options("*", cors());

//ROUTES
app.get("/", (req, res) => {
    res.send("Welcome to Cryptomart api");
});
app.post("/render", coinControllers.render);
app.post("/search", coinControllers.searchCoin);

app.listen(port, () => {
    console.log(`Cryptomart app listening on port: ${port}`);
});
