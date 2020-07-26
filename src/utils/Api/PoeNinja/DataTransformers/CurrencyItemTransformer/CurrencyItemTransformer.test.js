import CurrencyItemTransformer from "./CurrencyItemTransformer";

describe("CurrencyItemTransformer", () => {
  const itemDetails = {
    currencyDetails: [
      {
        icon:
          "https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyRerollRare.png?scale=1&w=1&h=1",
        id: 1,
        name: "Chaos Orb",
        poeTradeId: 4
      }
    ],
    lines: [
      {
        chaosEquivalent: 1000,
        currencyTypeName: "Chaos Orb",
        lowConfidencePaySparkLine: {
          totalChange: 0
        },
        lowConfidenceReceiveSparkLine: {
          totalChange: 0
        },
        pay: null,
        paySparkLine: {
          totalChange: 0
        },
        receive: {
          get_currency_id: 60,
          value: 1000
        },
        receiveSparkLine: {
          totalChange: 0
        }
      }
    ]
  };

  it("sets the item name", () => {
    const expectedItemName = itemDetails.lines[0].currencyTypeName;

    const returnedCurrencyItems = CurrencyItemTransformer(itemDetails);
    const actualItemName = returnedCurrencyItems[0].name;

    expect(actualItemName).toEqual(expectedItemName);
  });

  it("sets the icon link", () => {
    const expectedIconLink = itemDetails.currencyDetails[0].icon;

    const returnedCurrencyItems = CurrencyItemTransformer(itemDetails);
    const actualIconLink = returnedCurrencyItems[0].iconLink;

    expect(actualIconLink).toEqual(expectedIconLink);
  });

  it("sets the item id", () => {
    const expectedItemId = itemDetails.currencyDetails[0].id;

    const returnedCurrencyItems = CurrencyItemTransformer(itemDetails);
    const actualItemId = returnedCurrencyItems[0].id;

    expect(actualItemId).toEqual(expectedItemId);
  });

  describe("when chaos buy price is defined", () => {
    it("sets the rounded chaos price to buyDetails.chaosPrice", () => {
      const expectedBuyChaosPrice = Math.round(
        itemDetails.lines[0].receive.value
      );

      const returnedCurrencyItems = CurrencyItemTransformer(itemDetails);
      const actualBuyChaosPrice =
        returnedCurrencyItems[0].buyDetails.chaosPrice;

      expect(actualBuyChaosPrice).toEqual(expectedBuyChaosPrice);
    });
  });

  describe("when chaos buy price is not defined", () => {
    beforeEach(() => {
      itemDetails.lines[0].receive = undefined;
    });

    it("sets N/A to buyDetails.chaosPrice", () => {
      const expectedBuyChaosPrice = "N/A";

      const returnedCurrencyItems = CurrencyItemTransformer(itemDetails);
      const actualBuyChaosPrice =
        returnedCurrencyItems[0].buyDetails.chaosPrice;

      expect(actualBuyChaosPrice).toEqual(expectedBuyChaosPrice);
    });
  });

  it("sets N/A to buyDetails.exaltPrice", () => {
    const expectedBuyExaltPrice = "N/A";

    const returnedCurrencyItems = CurrencyItemTransformer(itemDetails);
    const actualBuyExaltPrice = returnedCurrencyItems[0].buyDetails.exaltPrice;

    expect(actualBuyExaltPrice).toEqual(expectedBuyExaltPrice);
  });

  describe("when the weekly change of buys is defined", () => {
    it("sets the value to buyDetails.weeklyChange", () => {
      const expectedWeeklyChange =
        itemDetails.lines[0].lowConfidenceReceiveSparkLine.totalChange;

      const returnedCurrencyItems = CurrencyItemTransformer(itemDetails);
      const actualWeeklyChange =
        returnedCurrencyItems[0].buyDetails.weeklyChange;

      expect(actualWeeklyChange).toEqual(expectedWeeklyChange);
    });
  });

  describe("when the weekly change of buys is not defined", () => {
    beforeEach(() => {
      itemDetails.lines[0].lowConfidenceReceiveSparkLine.totalChange = undefined;
    });

    it("sets N/A to buyDetails.weeklyChange", () => {
      const expectedWeeklyChange = "N/A";

      const returnedCurrencyItems = CurrencyItemTransformer(itemDetails);
      const actualWeeklyChange =
        returnedCurrencyItems[0].buyDetails.weeklyChange;

      expect(actualWeeklyChange).toEqual(expectedWeeklyChange);
    });
  });

  describe("when chaos sell price is defined", () => {
    it("sets the rounded chaos price to sellDetails.chaosPrice", () => {
      const expectedSellChaosPrice = itemDetails.lines[0].chaosEquivalent;

      const returnedCurrencyItems = CurrencyItemTransformer(itemDetails);
      const actualSellChaosPrice =
        returnedCurrencyItems[0].sellDetails.chaosPrice;

      expect(actualSellChaosPrice).toEqual(expectedSellChaosPrice);
    });
  });

  describe("when chaos sell price is not defined", () => {
    beforeEach(() => {
      itemDetails.lines[0].chaosEquivalent = undefined;
    });

    it("sets N/A to sellDetails.chaosPrice", () => {
      const expectedSellChaosPrice = "N/A";

      const returnedCurrencyItems = CurrencyItemTransformer(itemDetails);
      const actualSellChaosPrice =
        returnedCurrencyItems[0].sellDetails.chaosPrice;

      expect(actualSellChaosPrice).toEqual(expectedSellChaosPrice);
    });
  });

  it("sets N/A to sellDetails.exaltPrice", () => {
    const expectedSellExaltPrice = "N/A";

    const returnedCurrencyItems = CurrencyItemTransformer(itemDetails);
    const actualSellExaltPrice =
      returnedCurrencyItems[0].sellDetails.exaltPrice;

    expect(actualSellExaltPrice).toEqual(expectedSellExaltPrice);
  });

  describe("when the weekly change of sells is defined", () => {
    it("sets the value to sellDetails.weeklyChange", () => {
      const expectedSellWeeklyChange =
        itemDetails.lines[0].lowConfidencePaySparkLine.totalChange;

      const returnedCurrencyItems = CurrencyItemTransformer(itemDetails);
      const actualWeeklyChange =
        returnedCurrencyItems[0].sellDetails.weeklyChange;

      expect(actualWeeklyChange).toEqual(expectedSellWeeklyChange);
    });
  });

  describe("when the weekly change of sells is not defined", () => {
    beforeEach(() => {
      itemDetails.lines[0].lowConfidencePaySparkLine.totalChange = undefined;
    });

    it("sets N/A to sellDetails.weeklyChange", () => {
      const expectedSellWeeklyChange = "N/A";

      const returnedCurrencyItems = CurrencyItemTransformer(itemDetails);
      const actualWeeklyChange =
        returnedCurrencyItems[0].sellDetails.weeklyChange;

      expect(actualWeeklyChange).toEqual(expectedSellWeeklyChange);
    });
  });
});
