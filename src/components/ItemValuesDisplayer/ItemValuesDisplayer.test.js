import React from "react";
import { shallow } from "enzyme";
import ItemValuesDisplayer from "./ItemValuesDisplayer";
import ImageDisplayer from "../ImageDisplayer/ImageDisplayer";
import GetTrendIcon from "../ImageDisplayer/GetTrendIcon/GetTrendIcon";

jest.mock("../ImageDisplayer/ImageDisplayer", () => jest.fn());
jest.mock("../ImageDisplayer/GetTrendIcon/GetTrendIcon.js", () => jest.fn());

describe("<ItemValuesDisplayer />", () => {
  let wrapper;

  const label = "Buy";
  const itemDetails = {
    chaosPrice: 30,
    exaltPrice: "N/A",
    weeklyChange: -3.23
  };

  beforeAll(() => {
    wrapper = shallow(
      <ItemValuesDisplayer label={label} itemDetails={itemDetails} />
    );
  });

  it("renders the label text between the first divs", () => {
    expect(
      wrapper
        .find("div")
        .first()
        .text()
    ).toEqual(label);
  });

  it("calls GetTrendIcon", () => {
    expect(GetTrendIcon).toHaveBeenCalled();
  });

  it("calls ImageDisplayer", () => {
    expect(ImageDisplayer).toHaveBeenCalled();
  });
});
