require("dotenv").config();
const app = require("./app");
const PORT = process.env.PORT;
require("../utils/db");

const server = app.listen(PORT, () => {
  console.log(`Cryptomart app listening on port: ${PORT}`);
});
