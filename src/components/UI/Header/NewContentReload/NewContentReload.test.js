import React from "react";
import { shallow } from "enzyme";
import NewContentReload from "./NewContentReload";

describe("<NewContentReload />", () => {
  let wrapper;
  let onReloadButtonClick;

  beforeAll(() => {
    wrapper = shallow(<NewContentReload />);
    onReloadButtonClick = jest.spyOn(wrapper.instance(), "onReloadButtonClick");
  });

  describe("newContentAvailable event dispatch", () => {
    describe("when the event is not dispatched", () => {
      it("does not update show state field", () => {
        expect(wrapper.state("show")).toBeFalsy();
      });

      it("does not render the reload button", () => {
        expect(wrapper.find("button")).toHaveLength(0);
      });
    });
    describe("when the event is dispatched", () => {
      it("updates the show state field", () => {
        const event = new Event("newContentAvailable");
        window.dispatchEvent(event);
        expect(wrapper.state("show")).toBeTruthy();
      });

      it("renders the reload button", () => {
        expect(wrapper.find("button")).toHaveLength(1);
      });
    });
  });

  describe("Reload button click", () => {
    beforeEach(() => {
      window.location.reload = jest.fn();
    });

    it("calls onReloadButtonClick", () => {
      wrapper.find("button").simulate("click");
      expect(onReloadButtonClick).toHaveBeenCalled();
    });

    it("calls window.location.reload", () => {
      wrapper.find("button").simulate("click");
      expect(window.location.reload).toHaveBeenCalled();
    });
  });
});
