const request = require("supertest");
const app = require("../src/app");

describe("Route", () => {
  describe("GET /coin/data", () => {
    it("should retrieve list of 100 coin", async () => {
      const response = await request(app).get("/coin/data").expect(200);
      expect(response.body.result.data.length).toEqual(100);
    });
  });

  describe("GET /meta/:symbol", () => {
    it("should retrieve list of 100 coin", async () => {
      const response = await request(app).get("/coin/meta/btc").expect(200);
      expect(Object.keys(response.body.result.data)[0]).toEqual("BTC");
    });
  });
});
