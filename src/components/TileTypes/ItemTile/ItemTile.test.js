import React from "react";
import { shallow } from "enzyme";
import ItemTile from "./ItemTile";
import ItemValuesDisplayer from "../../ItemValuesDisplayer/ItemValuesDisplayer";
import TileActionButtons from "./TileActionButtons/TileActionButtons";
import { ItemDiv, HeaderDiv, InfoDiv } from "./ItemTile.style";

describe("<ItemTile />", () => {
  let wrapper;
  let onRemoveTile;
  let updateTile;

  const tile = {
    id: "fv8taf",
    type: "poeNinjaItemTile",
    data: {
      editing: false,
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
      },
      itemLeague: "Hardcore"
    }
  };

  beforeEach(() => {
    onRemoveTile = jest.fn();
    updateTile = jest.fn();

    wrapper = shallow(
      <ItemTile
        tile={tile}
        onRemoveTile={onRemoveTile}
        updateTile={updateTile}
      />
    );
  });

  it("renders ItemDiv", () => {
    expect(wrapper.find(ItemDiv)).toHaveLength(1);
  });

  it("renders HeaderDiv", () => {
    expect(wrapper.find(HeaderDiv)).toHaveLength(1);
  });

  it("renders the item name", () => {
    const expectedItemName = `${tile.data.item.name} (${tile.data.itemLeague})`;

    expect(
      wrapper
        .find("p")
        .first()
        .text()
    ).toEqual(expectedItemName);
  });

  it("renders TileActionButtons", () => {
    expect(wrapper.find(TileActionButtons)).toHaveLength(1);
  });

  it("renders InfoDiv", () => {
    expect(wrapper.find(InfoDiv)).toHaveLength(1);
  });

  it("renders the icon", () => {
    expect(wrapper.find("img")).toHaveLength(1);
  });

  it("renders two ItemValuesDisplayer", () => {
    expect(wrapper.find(ItemValuesDisplayer)).toHaveLength(2);
  });
});
