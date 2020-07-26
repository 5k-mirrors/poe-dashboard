const returnedDataWithoutError = [
  {
    id: 22,
    name: "Ancient Reliquary Key",
    iconLink:
      "https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyDuplicate.png?scale=1&w=1&h=1",
    buyDetails: {
      chaosPrice: 859.68,
      exaltPrice: "N/A",
      weeklyChange: -21.13
    },
    sellDetails: {
      chaosPrice: 879.18,
      exaltPrice: "N/A",
      weeklyChange: 12.34
    }
  },
  {
    id: 27,
    name: "Eternal Orb",
    iconLink:
      "https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyImprintOrb.png?scale=1&w=1&h=1",
    buyDetails: {
      chaosPrice: 18340,
      exaltPrice: "N/A",
      weeklyChange: -14.29
    },
    sellDetails: {
      chaosPrice: 18373,
      exaltPrice: "N/A",
      weeklyChange: -7.97
    }
  }
];

const transformer = jest.fn().mockReturnValue(returnedDataWithoutError);

export default transformer;
