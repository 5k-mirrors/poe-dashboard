import React from "react";

import ItemTile from "../ItemTile/ItemTile";
import ItemLoadingTile from "../ItemLoadingTile/ItemLoadingTile";
import ErrorTile from "../ErrorTile/ErrorTile";
import SelectorTile from "../SelectorTile/SelectorTile";

const isSelectedButNotLoaded = tileData => {
  return (
    !tileData.item &&
    tileData.itemLeague &&
    tileData.itemType &&
    tileData.itemName
  );
};

export const getTile = props => {
  const { tile } = props;
  let tileStage;

  switch (tile.type) {
    case "poeNinjaItemTile":
      if (tile.data.error) {
        tileStage = <ErrorTile {...props} />;
      } else if (tile.data.loading) {
        tileStage = <ItemLoadingTile {...props} />;
      } else if (tile.data.editing) {
        tileStage = <SelectorTile {...props} />;
      } else if (tile.data.item) {
        tileStage = <ItemTile {...props} />;
      } else if (isSelectedButNotLoaded(tile.data)) {
        tileStage = <ItemLoadingTile {...props} />;
      } else {
        tileStage = (
          <ErrorTile
            {...props}
            error="Could not render any Tile. Are you running the latest version? Otherwise this is likely a bug, consider reporting it."
          />
        );
      }
      break;

    default:
      tileStage = (
        <ErrorTile
          {...props}
          error="Could not render this Tile type. Do you have the latest version?"
        />
      );
      break;
  }

  return tileStage;
};
