const superagent = require("superagent");
const urlJoin = require("url-join");

const BASE_URL = process.env.BASE_URL;

describe("authorization", function () {

  describe("with no cookie set", () => {
    it("redirects to the login page", async () => {
      let response;
      try {
        response = await superagent
          .get(BASE_URL)
          .redirects(0)
          .ok((res) => res.status === 302);
      } catch (e) {
        console.error(e);
        expect.fail();
      }
      expect(response.status).toEqual(302);
      expect(response.headers.location).toBeOneOf([
        "login",
        urlJoin(BASE_URL, "/login"),
      ]);
    });
  });
});
