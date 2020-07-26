import "jest-styled-components";
import React from "react";
import { mount } from "enzyme";
import DownShift from "downshift";
import renderer from "react-test-renderer";
import DownShiftSelector from "./DownShiftSelector";
import { SelectorUl } from "./DownShiftSelector.style";

describe("<DownShiftSelector />", () => {
  let wrapper;
  let onChange;
  let placeholder;
  let items;

  beforeEach(() => {
    placeholder = "Placeholder";
    items = [{ name: "ItemOne" }, { name: "ItemTwo" }, { name: "ItemThree" }];
    onChange = jest.fn();
    wrapper = mount(<DownShiftSelector onChange={onChange} items={items} />);
  });

  it("renders DownShift component", () => {
    expect(wrapper.find(DownShift)).toHaveLength(1);
  });

  it("ul element has z-index of 1", () => {
    const tree = renderer
      .create(<SelectorUl />, { disableLifecycleMethods: true })
      .toJSON();
    expect(tree).toHaveStyleRule("z-index", "1");
  });

  describe("input", () => {
    describe("mouse down event", () => {
      it("stops propagation", () => {
        const stopPropagation = jest.fn();
        const input = wrapper.find("input").at(0);
        input.simulate("mouseDown", { stopPropagation });
        expect(stopPropagation).toHaveBeenCalled();
      });
    });

    describe("when placeholder is not defined in the props", () => {
      it("does not adapt the text to the input field", () => {
        const input = wrapper.find("input").at(0);
        expect(input.prop("placeholder")).toEqual("");
      });
    });

    describe("when placeholder is defined in the props", () => {
      it("adapts the text to the input field", () => {
        wrapper.setProps({ placeholder });
        const input = wrapper.find("input").at(0);
        expect(input.prop("placeholder")).toEqual(placeholder);
      });
    });
  });

  describe("li item search", () => {
    it("calls onChange", () => {
      const searchValue = "o";
      wrapper
        .find("input")
        .first()
        .simulate("change", { target: { value: searchValue } });
      wrapper
        .find("li")
        .first()
        .simulate("click");
      expect(onChange).toHaveBeenCalled();
    });
  });

  describe("li item click", () => {
    it("presents the proper item into the li", () => {
      const searchValue = "o";
      wrapper
        .find("input")
        .first()
        .simulate("change", { target: { value: searchValue } });
      const li = wrapper.find("li").first();
      li.simulate("click");
      expect(
        wrapper
          .find("input")
          .at(0)
          .props().value
      ).toBe(li.text());
    });
  });

  describe("ul render on input change", () => {
    it("renders filtered items", () => {
      items = [{ name: "ItemOne" }, { name: "ItemTwo" }, { name: "ItemThree" }];
      wrapper = mount(<DownShiftSelector onChange={onChange} items={items} />);
      const value = "o";
      const results = items.filter(item =>
        item.name.toLowerCase().includes(value)
      );
      const input = wrapper.find("input").at(0);
      input.simulate("change", { target: { value } });
      expect(wrapper.find("li")).toHaveLength(results.length);
    });
  });
});
