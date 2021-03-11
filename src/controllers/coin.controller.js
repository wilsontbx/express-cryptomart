const rp = require("request-promise");

const CoinControllers = {
  getData: async (next) => {
    const requestOptions = {
      method: "GET",
      uri:
        "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",
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

    try {
      const allCoin = await rp(requestOptions);
      return allCoin;
    } catch (err) {
      next(err);
    }
  },
  getMeta: async (symbol, next) => {
    const requestOptions = {
      method: "GET",
      uri: "https://pro-api.coinmarketcap.com/v2/cryptocurrency/info",
      qs: {
        symbol: symbol,
      },
      headers: {
        "X-CMC_PRO_API_KEY": process.env.API_KEY,
      },
      json: true,
      gzip: true,
    };

    try {
      const coinMeta = await rp(requestOptions);
      return coinMeta;
    } catch (err) {
      next(err);
    }
  },
};

module.exports = CoinControllers;
