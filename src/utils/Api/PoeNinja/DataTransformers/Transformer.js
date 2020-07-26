import CurrencyItemTransformer from "./CurrencyItemTransformer/CurrencyItemTransformer";
import GenericItemTransformer from "./GenericItemTransformer/GenericItemTransformer";

export const transformer = data => {
  try {
    let transformedData = null;
    if (data.currencyDetails) transformedData = CurrencyItemTransformer(data);
    else transformedData = GenericItemTransformer(data);
    return transformedData;
  } catch (err) {
    return null;
  }
};
