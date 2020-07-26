import getProxyURL from "./GetProxyURL";

describe("getProxyURL", () => {
  const url = "http://api.pathofexile.com/leagues?type=main&compact=1";

  describe("when CORS_PROXY_ENABLED env var is true", () => {
    it("returns the given URL with a CORS PROXY", () => {
      process.env.CORS_PROXY_ENABLED = true;
      expect(getProxyURL(url)).toEqual(
        `https://c-hive-proxy.herokuapp.com/${url}`
      );
    });
  });

  describe("when CORS_PROXY_ENABLED env var is false", () => {
    it("returns the given URL without a CORS PROXY", () => {
      process.env.CORS_PROXY_ENABLED = false;
      expect(getProxyURL(url)).toEqual(url);
    });
  });
});
