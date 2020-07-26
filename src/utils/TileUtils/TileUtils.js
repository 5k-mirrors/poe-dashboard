import Pick from "object.pick";

// Some data should not be serialized into URL and localStorage
// E.g.
//   - item data if saved would not refresh on reload
//   - falsey data on objects is redundant and only makes the URL longer
//     - except for `0` which is a valid ID
//   - the edit feature seems the most straightforward if values (except the flag) are cleared on refresh
export const filterDataToStore = tiles => {
  const compactedTiles = [];

  tiles.forEach(tile => {
    let compactedTile;
    switch (tile.type) {
      case "poeNinjaItemTile":
        compactedTile = Pick(tile, ["id", "type"]);
        compactedTile.data = {};

        Object.keys(tile.data).forEach(key => {
          const dataField = tile.data[key];
          if (
            key === "item" ||
            key === "items" ||
            key === "error" ||
            key === "editedItemId" ||
            key === "editedItemName" ||
            key === "editedItemLeague" ||
            key === "editedItemType"
          ) {
            return;
          }
          if (dataField === 0 || dataField) {
            compactedTile.data[key] = dataField;
          }
        });
        break;

      default:
        compactedTile = tile;
        break;
    }

    compactedTiles.push(compactedTile);
  });

  return compactedTiles;
};
