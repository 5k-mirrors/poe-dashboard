import React from "react";
import { shallow } from "enzyme";
import Selectors from "./Selectors";
import ItemTypeSelector from "./ItemTypeSelector/ItemTypeSelector";
import LeagueSelector from "./LeagueSelector/LeagueSelector";

describe("<Selectors />", () => {
  let selectorsWrapper;
  let selectorChanged;
  const tile = {
    data: {
      editedItemType: "Fragment",
      itemType: "Currency"
    }
  };

  beforeEach(() => {
    selectorChanged = jest.fn();
    selectorsWrapper = shallow(
      <Selectors selectorChanged={selectorChanged} tile={tile} />
    );
  });

  it("renders <ItemTypeSelector /> component", () => {
    expect(selectorsWrapper.find(ItemTypeSelector)).toHaveLength(1);
  });

  it("renders <LeagueSelector /> component", () => {
    expect(selectorsWrapper.find(LeagueSelector)).toHaveLength(1);
  });
});
