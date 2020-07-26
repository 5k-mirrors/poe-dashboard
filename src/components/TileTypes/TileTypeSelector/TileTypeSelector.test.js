import React from "react";
import * as TileTypeSelector from "./TileTypeSelector";

import ItemTile from "../ItemTile/ItemTile";
import ItemLoadingTile from "../ItemLoadingTile/ItemLoadingTile";
import ErrorTile from "../ErrorTile/ErrorTile";
import SelectorTile from "../SelectorTile/SelectorTile";
import { initialByType } from "../../../resources/Tiles/Tiles";

describe("TileTypeSelector", () => {
  let wrapper;
  let tile;

  beforeEach(() => {
    tile = initialByType("poeNinjaItemTile");
  });

  describe("when tile.data.loading is true", () => {
    it("renders ItemLoadingTile", () => {
      tile.data.loading = true;

      wrapper = TileTypeSelector.getTile({ tile });

      expect(wrapper).toEqual(<ItemLoadingTile tile={tile} />);
    });
  });

  describe("when tile.data.error is set", () => {
    it("renders ErrorTile", () => {
      tile.data.error = "Something went wrong.";

      wrapper = TileTypeSelector.getTile({ tile });

      expect(wrapper).toEqual(<ErrorTile tile={tile} />);
    });
  });

  describe("when tile.data.editing is true", () => {
    it("renders SelectorTile", () => {
      tile.data.editing = true;

      wrapper = TileTypeSelector.getTile({ tile });

      expect(wrapper).toEqual(<SelectorTile tile={tile} />);
    });
  });

  describe("when tile.data.item is set", () => {
    it("renders ItemTile", () => {
      tile.data.editing = false;
      tile.data.item = {};

      wrapper = TileTypeSelector.getTile({ tile });

      expect(wrapper).toEqual(<ItemTile tile={tile} />);
    });
  });

  describe("when none of the above is rendered", () => {
    it("renders ErrorTile", () => {
      tile.data.editing = false;
      const error =
        "Could not render any Tile. Are you running the latest version? Otherwise this is likely a bug, consider reporting it.";
      const expectedTileType = <ErrorTile tile={tile} error={error} />;

      wrapper = TileTypeSelector.getTile({ tile });

      expect(wrapper).toEqual(expectedTileType);
    });
  });

  describe("when tile type is not recognized", () => {
    it("renders ErrorTile", () => {
      tile.type = "fake";
      const error =
        "Could not render this Tile type. Do you have the latest version?";
      const expectedTileType = <ErrorTile tile={tile} error={error} />;

      wrapper = TileTypeSelector.getTile({ tile });

      expect(wrapper).toEqual(expectedTileType);
    });
  });
});
