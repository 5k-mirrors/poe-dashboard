import React from "react";
import ItemTypeSelector from "./ItemTypeSelector/ItemTypeSelector";
import LeagueSelector from "./LeagueSelector/LeagueSelector";
import SelectorsStyledDiv from "./Selectors.style";

const selectors = ({ selectorChanged, tile }) => (
  <SelectorsStyledDiv>
    <ItemTypeSelector
      onChange={item => selectorChanged("editedItemType", item)}
      placeholder={tile.data.editedItemType || tile.data.itemType}
    />
    <LeagueSelector
      onChange={item => selectorChanged("editedItemLeague", item)}
      placeholder={tile.data.editedItemLeague || tile.data.itemLeague}
    />
  </SelectorsStyledDiv>
);

export default selectors;
