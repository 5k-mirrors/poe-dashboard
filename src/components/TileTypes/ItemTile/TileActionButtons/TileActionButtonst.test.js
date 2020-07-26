import React from "react";
import { shallow } from "enzyme";
import "jest-styled-components";
import TileActionButtons from "./TileActionButtons";

describe("<TileActionButtons />", () => {
  let wrapper;
  let onRemove;
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
      }
    }
  };

  beforeEach(() => {
    onRemove = jest.fn();
    updateTile = jest.fn();

    wrapper = shallow(
      <TileActionButtons
        onRemove={onRemove}
        updateTile={updateTile}
        tile={tile}
      />
    );
  });

  it("renders two buttons", () => {
    expect(wrapper.find("button")).toHaveLength(2);
  });

  describe("Edit button", () => {
    describe("mouse down event", () => {
      it("stops propagation", () => {
        const stopPropagation = jest.fn();
        wrapper
          .find("button")
          .first()
          .simulate("mouseDown", { stopPropagation });
        expect(stopPropagation).toBeCalled();
      });
    });

    describe("click event", () => {
      it("calls updateTile along with the item details", () => {
        const expectedObjectCalled = {
          ...tile
        };
        expectedObjectCalled.data.editing = true;

        wrapper
          .find("button")
          .first()
          .simulate("click");

        expect(updateTile).toHaveBeenCalledWith(expectedObjectCalled);
      });
    });
  });

  describe("Delete button", () => {
    describe("mouse down event", () => {
      it("stops propagation", () => {
        const stopPropagation = jest.fn();
        wrapper
          .find("button")
          .at(1)
          .simulate("mouseDown", { stopPropagation });
        expect(stopPropagation).toBeCalled();
      });
    });

    describe("click event", () => {
      it("calls onRemove props function along with the id of the tile", () => {
        wrapper
          .find("button")
          .at(1)
          .simulate("click");
        expect(onRemove).toHaveBeenCalledWith(tile.id);
      });
    });
  });
});
