const rp = require("request-promise");

const coinControllers = {
  render: (req, res) => {
    const { limit } = req.body;
    const requestOptions = {
      method: "GET",
      uri:
        "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",
      qs: {
        start: "1",
        limit: limit,
        convert: "USD",
      },
      headers: {
        "X-CMC_PRO_API_KEY": process.env.API_KEY,
      },
      json: true,
      gzip: true,
    };

    rp(requestOptions)
      .then((response) => {
        res.statusCode = 200;
        res.json({
          success: true,
          message: "Coin list found",
          allResult: response,
        });
      })
      .catch((err) => {
        res.statusCode = 404;
        res.json({
          success: false,
          message: "user unauthorized (status)",
          err: err,
        });
      });
  },
  searchCoin: (req, res) => {
    const { id } = req.body;
    const requestOptions = {
      method: "GET",
      uri: "https://pro-api.coinmarketcap.com/v2/cryptocurrency/info",
      qs: {
        start: "1",
        limit: "100",
        convert: "USD",
      },
      headers: {
        "X-CMC_PRO_API_KEY": process.env.API_KEY,
      },
      json: true,
      gzip: true,
    };

    rp(requestOptions)
      .then((response) => {
        res.statusCode = 200;
        res.json({
          success: true,
          message: "Coin found",
          allResult: response,
        });
      })
      .catch((err) => {
        res.statusCode = 404;
        res.json({
          success: false,
          message: "user unauthorized (status)",
          err: err,
        });
      });
  },
};

module.exports = coinControllers;
