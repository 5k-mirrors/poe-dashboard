import React from "react";
import { mount } from "enzyme";
import DownShiftSelector from "../DownShiftSelector/DownShiftSelector";
import ItemSelector from "./ItemSelector";

describe("<ItemSelector />", () => {
  let wrapper;
  let onChange;
  let items;

  beforeEach(() => {
    items = [{ name: "First" }, { name: "Second" }, { name: "Third" }];
    onChange = jest.fn();
    wrapper = mount(<ItemSelector items={items} itemSelection={onChange} />);
  });

  it("renders DownShiftSelector component", () => {
    expect(wrapper.find(DownShiftSelector)).toHaveLength(1);
  });
});
