import * as UniqueIdGenerator from "../../utils/UniqueIdGenerator/UniqueIdGenerator";

export const defaultTiles = () => {
  return [
    {
      id: UniqueIdGenerator.uniqueIdGenerator(),
      type: "poeNinjaItemTile",
      data: {
        itemType: "Currency",
        itemLeague: "Temp SC",
        itemName: "Mirror of Kalandra",
        itemId: 22,
        item: null,
        items: null,
        error: null,

        loading: true,
        submitted: false,
        editing: false
      },
      x: 0,
      y: 1
    },
    {
      id: UniqueIdGenerator.uniqueIdGenerator(),
      type: "poeNinjaItemTile",
      data: {
        itemType: "Currency",
        itemLeague: "Temp SC",
        itemName: "Exalted Orb",
        itemId: 2,
        items: null,
        item: null,
        error: null,

        loading: true,
        submitted: false,
        editing: false
      },
      x: 1,
      y: 1
    },
    {
      id: UniqueIdGenerator.uniqueIdGenerator(),
      type: "poeNinjaItemTile",
      data: {
        itemType: "UniqueAccessory",
        itemLeague: "Temp SC",
        itemName: "Xoph's Blood",
        itemId: 1993,
        items: null,
        item: null,
        error: null,

        loading: true,
        submitted: false,
        editing: false
      },
      x: 2,
      y: 1
    }
  ];
};

export const initialByType = type => {
  const initialTiles = {
    poeNinjaItemTile: {
      id: UniqueIdGenerator.uniqueIdGenerator(),
      type: "poeNinjaItemTile",
      data: {
        itemType: null,
        itemLeague: null,
        itemName: null,
        itemId: null,
        items: null,
        item: null,
        error: null,

        loading: false,
        submitted: false,
        editing: true
      }
    }
  };

  return initialTiles[type];
};
