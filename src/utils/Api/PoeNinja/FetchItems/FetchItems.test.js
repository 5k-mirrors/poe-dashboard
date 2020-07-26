import * as FetchItems from "./FetchItems";

window.fetch = jest.fn().mockImplementation(() => ({
  status: 200,
  json: () =>
    new Promise(resolve => {
      resolve({
        lines: [
          {
            name: "House of Mirrors",
            id: 636
          }
        ]
      });
    })
}));

describe("FetchItems", () => {
  const itemType = "Currency";
  const league = "Standard";

  it("calls fetch with the proper url", async () => {
    process.env.CORS_PROXY_ENABLED = true;
    await FetchItems.fetchItems(itemType, league);
    const calledUrl = window.fetch.mock.calls[0][0];
    const expectedCallUrl =
      "https://c-hive-proxy.herokuapp.com/https://poe.ninja/api/data/currencyoverview?league=Standard&type=Currency";
    expect(calledUrl).toEqual(expectedCallUrl);
  });

  it("returns the proper items if status code is 200", async () => {
    const responseData = await FetchItems.fetchItems(itemType, league);
    const expectedData = {
      name: "House of Mirrors",
      id: 636
    };
    expect(responseData.lines[0]).toEqual(expectedData);
  });
});
