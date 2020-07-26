import React from "react";
import { shallow } from "enzyme";
import SelectorTile from "./SelectorTile";
import Selectors from "../../Selectors/Selectors";
import ItemSelector from "../../Selectors/ItemSelector/ItemSelector";
import SelectorTileButtons from "./SelectorTileButtons/SelectorTileButtons";

function resetCurrentTileDetails() {
  return {
    id: "fv8taf",
    type: "poeNinjaItemTile",
    data: {
      item: {
        buyChaosPrice: 27972,
        buyExaltPrice: null,
        buyWeeklyChange: -0.22,
        iconLink:
          "https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyDuplicate.png?scale=1&w=1&h=1",
        id: 22,
        name: "Mirror of Kalandra",
        sellChaosPrice: 27546.68,
        sellExaltPrice: null,
        sellWeeklyChange: 8.49
      }
    },
    editing: true,
    itemLeague: null,
    itemType: null,
    itemId: null,
    itemName: null
  };
}

describe("<SelectorTile />", () => {
  let wrapper;

  let tile;

  beforeEach(() => {
    tile = resetCurrentTileDetails();
  });

  describe("when tileDetails.data does not exist", () => {
    beforeEach(() => {
      wrapper = shallow(<SelectorTile tile={tile} />);
    });

    it("renders Selectors", () => {
      expect(wrapper.find(Selectors)).toHaveLength(1);
    });

    it("does not render ItemSelector", () => {
      expect(wrapper.find(ItemSelector)).toHaveLength(0);
    });

    it("renders SelectorTileButtons", () => {
      expect(wrapper.find(SelectorTileButtons)).toHaveLength(1);
    });
  });

  describe("when tileDetails.data exists", () => {
    beforeEach(() => {
      tile.data.items = [
        {
          id: 22
        }
      ];

      wrapper = shallow(<SelectorTile tile={tile} />);
    });

    it("renders Selectors", () => {
      expect(wrapper.find(Selectors)).toHaveLength(1);
    });

    it("renders ItemSelector", () => {
      expect(wrapper.find(ItemSelector)).toHaveLength(1);
    });

    it("renders SelectorTileButtons", () => {
      expect(wrapper.find(SelectorTileButtons)).toHaveLength(1);
    });
  });

  describe("onSelection", () => {
    const updateTile = jest.fn();

    beforeEach(() => {
      wrapper = shallow(<SelectorTile tile={tile} updateTile={updateTile} />);
    });

    describe("when tile.itemLeague or tile.itemType is not set", () => {
      it("sets tile[fieldName] to the given value", () => {
        wrapper.instance().onSelection("editedItemLeague", "Betrayal");

        expect(wrapper.instance().tile.data.editedItemLeague).toEqual(
          "Betrayal"
        );
      });
    });

    describe("when tile.itemLeague and tile.itemType are set", () => {
      it("calls updateTile", () => {
        wrapper.instance().onSelection("editedItemType", "Mirror of Kalandra");
        wrapper.instance().onSelection("editedItemLeague", "Betrayal");

        expect(updateTile).toHaveBeenCalled();
      });
    });
  });

  describe("onItemNameSelection", () => {
    const updateTile = jest.fn();

    beforeEach(() => {
      wrapper = shallow(<SelectorTile tile={tile} updateTile={updateTile} />);
    });

    it("calls updateTile", () => {
      wrapper.instance().onItemNameSelection(null);
      expect(updateTile).toHaveBeenCalled();
    });

    describe("when value is either not defined or not a number", () => {
      it("sets tileDetails.editedItemId to null", () => {
        wrapper.instance().onItemNameSelection("fakeValue");
        expect(wrapper.instance().tile.data.editedItemId).toBeNull();
      });

      it("sets tileDetails.editedItemName to null", () => {
        wrapper.instance().onItemNameSelection("fakeValue");
        expect(wrapper.instance().tile.data.editedItemName).toBeNull();
      });
    });

    describe("when value is defined and also a number", () => {
      beforeEach(() => {
        tile.data.items = [
          {
            id: 22,
            name: "Mirror of Kalandra"
          }
        ];

        wrapper = shallow(<SelectorTile tile={tile} updateTile={updateTile} />);
      });

      it("sets tileDetails.editedItemName", () => {
        wrapper.instance().onItemNameSelection(22);
        expect(wrapper.instance().tile.data.editedItemName).toEqual(
          "Mirror of Kalandra"
        );
      });

      it("sets tileDetails.editedItemId", () => {
        wrapper.instance().onItemNameSelection(22);
        expect(wrapper.instance().tile.data.editedItemId).toEqual(22);
      });
    });
  });
});
