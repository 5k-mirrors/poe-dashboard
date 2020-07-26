import * as FetchLeagues from "./FetchLeagues";
import getProxyURL from "../../GetProxyURL/GetProxyURL";
import baseUrl from "./BaseUrl";
import LeaguesTransformer from "../../LeaguesTransformer/LeaguesTransformer";

jest.mock("../../LeaguesTransformer/LeaguesTransformer.js");

window.fetch = jest.fn().mockImplementation(() => ({
  status: 200,
  json: () =>
    new Promise(resolve => {
      resolve({ leagues: [{ id: "Standard" }] });
    })
}));

describe("FetchLeagues", () => {
  const leaguesUrl = `${baseUrl()}leagues?type=main&compact=1`;

  describe("proxy url setup", () => {
    it("sets the proper proxy url when cors proxy is active", () => {
      process.env.CORS_PROXY_ENABLED = true;
      const apiUrl = getProxyURL(leaguesUrl);
      const expectedApiUrl = `https://c-hive-proxy.herokuapp.com/${leaguesUrl}`;
      expect(apiUrl).toEqual(expectedApiUrl);
    });
  });

  it("calls fetch with the proper url", async () => {
    const fetchUrl =
      "https://c-hive-proxy.herokuapp.com/http://api.pathofexile.com/leagues?type=main&compact=1";
    await FetchLeagues.fetchLeagues();
    const calledUrl = window.fetch.mock.calls[0][0];
    expect(calledUrl).toEqual(fetchUrl);
  });

  it("returns the leagues if status code is 200", async () => {
    LeaguesTransformer.mockImplementationOnce(() => [
      { id: "Standard", name: "Standard" }
    ]);
    const responseData = await FetchLeagues.fetchLeagues();
    const exptectedData = [{ id: "Standard", name: "Standard" }];
    expect(responseData).toEqual(exptectedData);
  });
});
