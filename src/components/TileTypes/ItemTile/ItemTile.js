import React from "react";
import ItemValuesDisplayer from "../../ItemValuesDisplayer/ItemValuesDisplayer";
import { ItemDiv, HeaderDiv, InfoDiv } from "./ItemTile.style";
import TileActionButtons from "./TileActionButtons/TileActionButtons";

const itemTile = props => {
  const { onRemoveTile, tile, updateTile } = props;
  const itemInfo = tile.data.item;

  return (
    <ItemDiv>
      <HeaderDiv>
        <p>
          {itemInfo.name} <span>({tile.data.itemLeague})</span>
        </p>
        <TileActionButtons
          onRemove={onRemoveTile}
          tile={tile}
          updateTile={updateTile}
        />
      </HeaderDiv>
      <img src={itemInfo.iconLink} alt={itemInfo.name} />
      <InfoDiv>
        <ItemValuesDisplayer label="Buy" itemDetails={itemInfo.buyDetails} />
        <ItemValuesDisplayer label="Sell" itemDetails={itemInfo.sellDetails} />
      </InfoDiv>
    </ItemDiv>
  );
};

export default itemTile;
