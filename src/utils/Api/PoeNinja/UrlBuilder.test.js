import urlBuilder from "./UrlBuilder";

describe("urlBuilder", () => {
  describe("when type is currency", () => {
    it("returns currency url", () => {
      const league = "Standard";
      const itemType = "Currency";
      const url = urlBuilder(itemType, league);
      expect(url).toEqual(
        "https://poe.ninja/api/data/currencyoverview?league=Standard&type=Currency"
      );
    });
  });

  describe("when type is fragment", () => {
    it("returns currency url", () => {
      const league = "Standard";
      const itemType = "Fragment";
      const url = urlBuilder(itemType, league);
      expect(url).toEqual(
        "https://poe.ninja/api/data/currencyoverview?league=Standard&type=Fragment"
      );
    });
  });

  describe("when type is UniqueAccessory", () => {
    it("returns item url", () => {
      const league = "Standard";
      const itemType = "UniqueAccessory";
      const url = urlBuilder(itemType, league);
      expect(url).toEqual(
        "https://poe.ninja/api/data/itemoverview?league=Standard&type=UniqueAccessory"
      );
    });
  });

  describe("when lague is Harvest", () => {
    it("returns url for Harvest", () => {
      const league = "Harvest";
      const itemType = "UniqueAccessory";
      const url = urlBuilder(itemType, league);
      expect(url).toEqual(
        "https://poe.ninja/api/data/itemoverview?league=Harvest&type=UniqueAccessory"
      );
    });
  });
});
