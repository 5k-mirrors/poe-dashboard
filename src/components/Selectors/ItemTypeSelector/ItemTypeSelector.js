import React from "react";
import DownShiftSelector from "../DownShiftSelector/DownShiftSelector";
import itemTypes from "../../../resources/ItemTypes/ItemTypes";

const itemTypeSelector = ({ onChange, placeholder }) => {
  const formattedItemTypes = itemTypes.map(itemType => ({ name: itemType }));
  return (
    <DownShiftSelector
      onChange={onChange}
      placeholder={placeholder || "Search item types..."}
      items={formattedItemTypes}
    />
  );
};

export default itemTypeSelector;
