import React from "react";
import { shallow } from "enzyme";
import createHistory from "history/createBrowserHistory";
import { configureUrlQuery } from "react-url-query";
import Root from "./Root";

jest.mock("../../utils/ReactUrlQuery/mapUrlToProps/mapUrlToProps.js");

describe("<Root />", () => {
  let wrapper;

  beforeEach(() => {
    const history = createHistory();
    configureUrlQuery({ history });

    wrapper = shallow(<Root />);
  });

  describe("setRef", () => {
    it("sets the ref", () => {
      const ref = true;
      wrapper.instance().setRef(ref);
      expect(wrapper.instance().ref).toBe(ref);
    });
  });

  describe("onAddTile", () => {
    it("calls the ref`s onAddTile function", () => {
      const onAddTile = jest.fn();

      const updatedRef = {
        onAddTile
      };

      wrapper.instance().ref = updatedRef;
      wrapper.instance().onAddTile();
      expect(onAddTile).toHaveBeenCalled();
    });
  });

  describe("onClearGrid", () => {
    const onClearGrid = jest.fn();

    describe("when the grid is empty", () => {
      const updatedRef = {
        state: {
          layout: [],
          tiles: []
        },
        onClearGrid
      };

      beforeEach(() => {
        wrapper.instance().ref = updatedRef;
      });

      it("does not call this.ref.onClearGrid function", () => {
        wrapper.instance().onClearGrid();
        expect(onClearGrid).toHaveBeenCalledTimes(0);
      });
    });
    describe("when the grid is not empty", () => {
      const updatedRef = {
        state: {
          layout: [{}],
          tiles: [{}]
        },
        onClearGrid
      };

      beforeEach(() => {
        wrapper.instance().ref = updatedRef;
      });

      it("calls this.ref.onClearGrid function", () => {
        wrapper.instance().onClearGrid();
        expect(onClearGrid).toHaveBeenCalled();
      });
    });
  });
});
