const request = require("supertest");
const app = require("../src/app");

describe("Route", () => {
  describe("GET /coin/data", () => {
    it("should retrieve list of 100 coin", async () => {
      const response = await request(app).get("/coin/data").expect(200);
      expect(response.body.result.data.length).toEqual(100);
    });
  });
});
