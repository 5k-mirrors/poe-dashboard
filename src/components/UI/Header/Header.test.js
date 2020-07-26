import React from "react";
import { shallow } from "enzyme";
import Header from "./Header";
import { HeaderCenterButton, ClearGridButton } from "./Header.style";

describe("<Header />", () => {
  let wrapper;
  let onAddTileSubmit;
  let onClearGridSubmit;

  beforeEach(() => {
    onAddTileSubmit = jest.fn();
    onClearGridSubmit = jest.fn();
    wrapper = shallow(
      <Header
        onAddTileSubmit={onAddTileSubmit}
        onClearGridSubmit={onClearGridSubmit}
      />
    );
  });

  describe("Add button click", () => {
    it("calls onAddTileSubmit prop function", () => {
      expect(wrapper.find(HeaderCenterButton).prop("onClick")).toEqual(
        onAddTileSubmit
      );
    });
  });

  describe("Clear grid button click", () => {
    it("calls onClearGridSubmit prop function", () => {
      expect(wrapper.find(ClearGridButton).prop("onClick")).toEqual(
        onClearGridSubmit
      );
    });
  });
});
