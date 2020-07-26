import React from "react";
import { shallow } from "enzyme";
import SelectorTileButtons from "./SelectorTileButtons";

describe("<SelectorTileButtons />", () => {
  let wrapper;
  let onSave;
  let onCancel;

  beforeEach(() => {
    onSave = jest.fn();
    onCancel = jest.fn();

    wrapper = shallow(
      <SelectorTileButtons onSave={onSave} onCancel={onCancel} />
    );
  });

  it("renders two buttons", () => {
    expect(wrapper.find("button")).toHaveLength(2);
  });

  describe("Accept button", () => {
    describe("mouse down event", () => {
      it("stops propagation", () => {
        const stopPropagation = jest.fn();
        wrapper
          .find("button")
          .first()
          .simulate("mouseDown", { stopPropagation });
        expect(stopPropagation).toHaveBeenCalled();
      });
    });

    describe("click event", () => {
      it("calls onSave props function", () => {
        wrapper
          .find("button")
          .first()
          .simulate("click");
        expect(onSave).toHaveBeenCalled();
      });
    });

    describe("when isDisabled is true", () => {
      beforeEach(() => {
        wrapper.setProps({
          isDisabled: true
        });
      });

      it("disables the button", () => {
        expect(
          wrapper
            .find("button")
            .first()
            .props().disabled
        ).toBeTruthy();
      });
    });

    describe("when isDisabled is false", () => {
      beforeEach(() => {
        wrapper.setProps({
          isDisabled: false
        });
      });

      it("does not disable the button", () => {
        expect(
          wrapper
            .find("button")
            .first()
            .props().disabled
        ).toBeFalsy();
      });
    });
  });

  describe("Cancel button", () => {
    describe("mouse down event", () => {
      it("stops propagation", () => {
        const stopPropagation = jest.fn();
        wrapper
          .find("button")
          .at(1)
          .simulate("mouseDown", { stopPropagation });
        expect(stopPropagation).toHaveBeenCalled();
      });
    });

    describe("click event", () => {
      it("calls onCancel props function", () => {
        wrapper
          .find("button")
          .at(1)
          .simulate("click");
        expect(onCancel).toHaveBeenCalled();
      });
    });
  });
});
