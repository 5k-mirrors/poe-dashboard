import React from "react";
import { mount } from "enzyme";
import DownShiftSelector from "../DownShiftSelector/DownShiftSelector";
import ItemTypeSelector from "./ItemTypeSelector";

describe("<ItemTypeSelector />", () => {
  let wrapper;
  let onChange;

  beforeEach(() => {
    onChange = jest.fn();
    wrapper = mount(<ItemTypeSelector onChange={onChange} />);
  });

  it("renders DownShiftSelector component", () => {
    expect(wrapper.find(DownShiftSelector)).toHaveLength(1);
  });
});
