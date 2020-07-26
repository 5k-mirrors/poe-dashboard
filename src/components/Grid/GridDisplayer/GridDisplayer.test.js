import React from "react";
import { shallow } from "enzyme";
import GridDisplayer from "./GridDisplayer";
import ReactGridLayout from "../ReactGridLayout/ReactGridLayout";
import { TileDiv } from "./GridDisplayer.style";
import { initialByType } from "../../../resources/Tiles/Tiles";

describe("<GridDisplayer />", () => {
  let wrapper;

  const tile = initialByType("poeNinjaItemTile");

  const layout = [
    {
      h: 1,
      i: tile.id,
      id: tile.id,
      w: 1,
      x: 0,
      y: 0
    }
  ];

  const tiles = [tile];

  beforeEach(() => {
    wrapper = shallow(<GridDisplayer layout={layout} tiles={tiles} />);
  });

  it("renders ReactGridLayout", () => {
    expect(wrapper.find(ReactGridLayout)).toHaveLength(1);
  });

  it("renders TileDiv", () => {
    expect(wrapper.find(TileDiv)).toHaveLength(1);
  });
});
