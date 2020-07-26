import * as Transformer from "./Transformer";
import CurrencyItemTransformer from "./CurrencyItemTransformer/CurrencyItemTransformer";
import GenericItemTransformer from "./GenericItemTransformer/GenericItemTransformer";

jest.mock("./CurrencyItemTransformer/CurrencyItemTransformer");
jest.mock("./GenericItemTransformer/GenericItemTransformer");

describe("Transformer", () => {
  describe("when data.currencyDetails is defined", () => {
    const currencyData = {
      currencyDetails: "items",
      lines: "items"
    };
    Transformer.transformer(currencyData);
    it("runs CurrencyDataTransformer", () => {
      expect(CurrencyItemTransformer).toHaveBeenCalled();
    });
  });
  describe("when data.currencyDetails is not defined", () => {
    const genericData = {
      lines: "items"
    };
    Transformer.transformer(genericData);
    it("runs GenericDataTransformer", () => {
      expect(GenericItemTransformer).toHaveBeenCalled();
    });
  });

  describe("error handling while transforming", () => {
    const failedData = {
      failed: "failed"
    };
    GenericItemTransformer.mockImplementationOnce(() => {
      throw new Error();
    });
    const transformedData = Transformer.transformer(failedData);
    it("should return null", () => {
      expect(transformedData).toBeNull();
    });
  });
});
