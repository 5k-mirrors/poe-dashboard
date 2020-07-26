import ItemData from "../ItemData/itemData";
import { isDefined } from "../../../../JavaScriptUtil/JavaScriptUtil";

const getCurrencyItemBuyDetails = itemDetails => {
  const buyDetails = {};

  buyDetails.chaosPrice = isDefined(itemDetails.receive)
    ? Math.round(itemDetails.receive.value)
    : "N/A";
  buyDetails.exaltPrice = "N/A";
  buyDetails.weeklyChange = isDefined(
    itemDetails.lowConfidenceReceiveSparkLine.totalChange
  )
    ? itemDetails.lowConfidenceReceiveSparkLine.totalChange
    : "N/A";

  return buyDetails;
};

const getCurrencyItemSellDetails = itemDetails => {
  const sellDetails = {};

  sellDetails.chaosPrice = isDefined(itemDetails.chaosEquivalent)
    ? Math.round(itemDetails.chaosEquivalent)
    : "N/A";
  sellDetails.exaltPrice = "N/A";
  sellDetails.weeklyChange = isDefined(
    itemDetails.lowConfidencePaySparkLine.totalChange
  )
    ? itemDetails.lowConfidencePaySparkLine.totalChange
    : "N/A";

  return sellDetails;
};

const currencyItemTransformer = data => {
  const transformedCurrencyItems = data.lines.map(itemDetails => {
    let currencyItem = new ItemData();

    currencyItem.name = itemDetails.currencyTypeName;
    currencyItem.iconLink = data.currencyDetails.find(
      o => o.name === currencyItem.name
    ).icon;
    currencyItem.id = Number(
      data.currencyDetails.find(o => o.name === currencyItem.name).id
    );

    const currencyItemBuyDetails = getCurrencyItemBuyDetails(itemDetails);
    const currencyItemSellDetails = getCurrencyItemSellDetails(itemDetails);

    currencyItem = {
      ...currencyItem,
      buyDetails: {
        ...currencyItemBuyDetails
      },
      sellDetails: {
        ...currencyItemSellDetails
      }
    };

    return currencyItem;
  });

  return transformedCurrencyItems;
};

export default currencyItemTransformer;
