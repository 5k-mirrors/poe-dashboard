import React from "react";
import DownShiftSelector from "../DownShiftSelector/DownShiftSelector";

const itemSelector = ({ items, itemSelection }) => (
  <DownShiftSelector
    onChange={itemSelection}
    items={items}
    placeholder="Search items..."
  />
);

export default itemSelector;
