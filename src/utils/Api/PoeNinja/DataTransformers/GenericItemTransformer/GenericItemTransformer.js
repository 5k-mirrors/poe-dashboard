import ItemData from "../ItemData/itemData";
import { isDefined } from "../../../../JavaScriptUtil/JavaScriptUtil";

const getGenericItemBuyDetails = itemDetails => {
  const buyDetails = {};

  buyDetails.chaosPrice = isDefined(itemDetails.chaosValue)
    ? Math.round(itemDetails.chaosValue)
    : "N/A";
  buyDetails.exaltPrice = isDefined(itemDetails.exaltedValue)
    ? itemDetails.exaltedValue.toFixed(1)
    : "N/A";
  buyDetails.weeklyChange = isDefined(
    itemDetails.lowConfidenceSparkline.totalChange
  )
    ? itemDetails.lowConfidenceSparkline.totalChange
    : "N/A";

  return buyDetails;
};

const getGenericItemSellDetails = () => {
  const sellDetails = {};

  sellDetails.chaosPrice = "N/A";
  sellDetails.exaltPrice = "N/A";
  sellDetails.weeklyChange = "N/A";

  return sellDetails;
};

const genericItemTransformer = data => {
  const genericItems = data.lines.map(itemDetails => {
    let genericItem = new ItemData();

    genericItem.id = Number(itemDetails.id);
    genericItem.name = itemDetails.name;
    genericItem.iconLink = itemDetails.icon;

    const genericItemBuyDetails = getGenericItemBuyDetails(itemDetails);
    const genericItemSellDetails = getGenericItemSellDetails();

    genericItem = {
      ...genericItem,
      buyDetails: {
        ...genericItemBuyDetails
      },
      sellDetails: {
        ...genericItemSellDetails
      }
    };

    return genericItem;
  });

  return genericItems;
};

export default genericItemTransformer;
