import React from "react";
import { shallow } from "enzyme";
import ErrorTile from "./ErrorTile";
import { ErrorDiv, ErrorContentDiv, DeleteButton } from "./ErrorTile.style";

describe("<ErrorTile />", () => {
  let wrapper;
  let error;
  let onRemoveTile;
  let tile;

  beforeEach(() => {
    error = "Something went wrong.";
    onRemoveTile = jest.fn();
    tile = {
      id: "hjk54l"
    };

    wrapper = shallow(
      <ErrorTile error={error} onRemoveTile={onRemoveTile} tile={tile} />
    );
  });

  it("renders ErrorDiv", () => {
    expect(wrapper.find(ErrorDiv)).toHaveLength(1);
  });

  it("renders ErrorContentDiv along with the given error message", () => {
    expect(wrapper.find(ErrorContentDiv).text()).toEqual(error);
  });

  describe("DeleteButton", () => {
    it("renders the button", () => {
      expect(wrapper.find(DeleteButton)).toHaveLength(1);
    });

    describe("mouse down event", () => {
      it("stops propagation", () => {
        const stopPropagation = jest.fn();
        wrapper.find(DeleteButton).simulate("mouseDown", { stopPropagation });
        expect(stopPropagation).toHaveBeenCalled();
      });
    });

    describe("click event", () => {
      it("calls onRemoveTile props function along with the id of the current tile", () => {
        wrapper.find(DeleteButton).simulate("click");
        expect(onRemoveTile).toHaveBeenCalledWith(tile.id);
      });
    });
  });
});
