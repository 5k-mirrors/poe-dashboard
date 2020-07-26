import React from "react";
import { shallow } from "enzyme";
import LeagueSelector from "./LeagueSelector";
import DownShiftSelector from "../DownShiftSelector/DownShiftSelector";

describe("<LeagueSelector />", () => {
  let wrapper;

  it("renders DownShiftSelector", async () => {
    wrapper = shallow(<LeagueSelector />);

    expect(wrapper.find(DownShiftSelector)).toHaveLength(1);
  });
});
