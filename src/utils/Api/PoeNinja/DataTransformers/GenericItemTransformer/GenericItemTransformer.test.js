import GenericItemTransformer from "./GenericItemTransformer";

describe("GenericItemTransformer", () => {
  const itemDetails = {
    lines: [
      {
        id: 1540,
        name: "The King's Path",
        icon:
          "https://web.poecdn.com/image/Art/2DItems/Currency/ProphecyOrbRed.png?scale=1&scaleIndex=0&w=1&h=1",
        chaosValue: 418.35,
        exaltedValue: 5.412,
        lowConfidenceSparkline: {
          totalChange: -4.39
        }
      }
    ]
  };

  it("sets the item id", () => {
    const expectedId = itemDetails.lines[0].id;

    const returnedGenericItems = GenericItemTransformer(itemDetails);
    const actualId = returnedGenericItems[0].id;

    expect(actualId).toEqual(expectedId);
  });

  it("sets the item name", () => {
    const expectedItemName = itemDetails.lines[0].name;

    const returnedGenericItems = GenericItemTransformer(itemDetails);
    const actualItemName = returnedGenericItems[0].name;

    expect(actualItemName).toEqual(expectedItemName);
  });

  it("sets the icon link", () => {
    const expectedIconLink = itemDetails.lines[0].icon;

    const returnedGenericItems = GenericItemTransformer(itemDetails);
    const actualIconLink = returnedGenericItems[0].iconLink;

    expect(actualIconLink).toEqual(expectedIconLink);
  });

  describe("when chaos buy price is defined", () => {
    it("sets the rounded chaos price to buyDetails.chaosPrice", () => {
      const expectedBuyChaosPrice = Math.round(itemDetails.lines[0].chaosValue);

      const returnedGenericItems = GenericItemTransformer(itemDetails);
      const actualBuyChaosPrice = returnedGenericItems[0].buyDetails.chaosPrice;

      expect(actualBuyChaosPrice).toEqual(expectedBuyChaosPrice);
    });
  });

  describe("when chaos buy price is not defined", () => {
    beforeEach(() => {
      itemDetails.lines[0].chaosValue = undefined;
    });

    it("sets N/A to buyDetails.chaosPrice", () => {
      const expectedBuyChaosPrice = "N/A";

      const returnedGenericItems = GenericItemTransformer(itemDetails);
      const actualBuyChaosPrice = returnedGenericItems[0].buyDetails.chaosPrice;

      expect(actualBuyChaosPrice).toEqual(expectedBuyChaosPrice);
    });
  });

  describe("when exalt buy price is defined", () => {
    it("sets the fixed exalt price to buyDetails.exaltPrice", () => {
      const expectedBuyExaltPrice = itemDetails.lines[0].exaltedValue.toFixed(
        1
      );

      const returnedGenericItems = GenericItemTransformer(itemDetails);
      const actualBuyExaltPrice = returnedGenericItems[0].buyDetails.exaltPrice;

      expect(actualBuyExaltPrice).toEqual(expectedBuyExaltPrice);
    });
  });

  describe("when exalt buy price is not defined", () => {
    beforeEach(() => {
      itemDetails.lines[0].exaltedValue = undefined;
    });

    it("sets N/A to buyDetails.exaltPrice", () => {
      const expectedBuyExaltPrice = "N/A";

      const returnedGenericItems = GenericItemTransformer(itemDetails);
      const actualBuyExaltPrice = returnedGenericItems[0].buyDetails.exaltPrice;

      expect(actualBuyExaltPrice).toEqual(expectedBuyExaltPrice);
    });
  });

  describe("when the weekly change of buys is defined", () => {
    it("sets the value to buyDetails.weeklyChange", () => {
      const expectedBuyWeeklyChange =
        itemDetails.lines[0].lowConfidenceSparkline.totalChange;

      const returnedGenericItems = GenericItemTransformer(itemDetails);
      const actualBuyWeeklyChange =
        returnedGenericItems[0].buyDetails.weeklyChange;

      expect(actualBuyWeeklyChange).toEqual(expectedBuyWeeklyChange);
    });
  });

  describe("when the weekly change of buys is not defined", () => {
    beforeEach(() => {
      itemDetails.lines[0].lowConfidenceSparkline.totalChange = undefined;
    });

    it("sets N/A to buyDetails.weeklyChange", () => {
      const expectedBuyWeeklyChange = "N/A";

      const returnedGenericItems = GenericItemTransformer(itemDetails);
      const actualBuyWeeklyChange =
        returnedGenericItems[0].buyDetails.weeklyChange;

      expect(actualBuyWeeklyChange).toEqual(expectedBuyWeeklyChange);
    });
  });

  it("sets N/A to sellDetails.chaosPrice", () => {
    const expectedSellChaosPrice = "N/A";

    const returnedGenericItems = GenericItemTransformer(itemDetails);
    const actualSellChaosPrice = returnedGenericItems[0].sellDetails.chaosPrice;

    expect(actualSellChaosPrice).toEqual(expectedSellChaosPrice);
  });

  it("sets N/A to sellDetails.exaltPrice", () => {
    const expectedSellExaltPrice = "N/A";

    const returnedGenericItems = GenericItemTransformer(itemDetails);
    const actualSellExaltPrice = returnedGenericItems[0].sellDetails.exaltPrice;

    expect(actualSellExaltPrice).toEqual(expectedSellExaltPrice);
  });

  it("sets N/A to sellDetails.weeklyChange", () => {
    const expectedSellWeeklyChange = "N/A";

    const returnedGenericItems = GenericItemTransformer(itemDetails);
    const actualWeeklyChange = returnedGenericItems[0].sellDetails.weeklyChange;

    expect(actualWeeklyChange).toEqual(expectedSellWeeklyChange);
  });
});
