import React from "react";
import { shallow } from "enzyme";
import ItemLoadingTile from "./ItemLoadingTile";
import * as FetchLeagues from "../../../utils/Api/Ggg/FetchLeagues";
import * as FetchItems from "../../../utils/Api/PoeNinja/FetchItems/FetchItems";
import * as Transformer from "../../../utils/Api/PoeNinja/DataTransformers/Transformer";
import { initialByType } from "../../../resources/Tiles/Tiles";

jest.mock("../../../utils/Api/Ggg/FetchLeagues", () => {
  return require
    .requireActual("../../../utils/Test/TestUtils")
    .mockOriginalFunctionality("../Api/Ggg/FetchLeagues");
});

jest.mock("../../../utils/Api/PoeNinja/FetchItems/FetchItems", () => {
  return require
    .requireActual("../../../utils/Test/TestUtils")
    .mockOriginalFunctionality("../Api/PoeNinja/FetchItems/FetchItems");
});

jest.mock("../../../utils/Api/PoeNinja/DataTransformers/Transformer", () => {
  return require
    .requireActual("../../../utils/Test/TestUtils")
    .mockOriginalFunctionality("../Api/PoeNinja/DataTransformers/Transformer");
});

// Missing error cases.
describe("<ItemLoadingTile />", () => {
  let wrapper;
  let tile;
  const fetchLeaguesMockResponse = [
    {
      id: "Standard",
      name: "Standard"
    }
  ];
  const fetchItemsMockResponse = {
    currencyDetails: {
      id: 1,
      name: "Mirror of Kalandra"
    }
  };
  const updateTile = jest.fn();
  const mount = async () => {
    const itemLoadingTile = await shallow(
      <ItemLoadingTile
        tile={tile}
        updateTile={updateTile}
        leagues={fetchLeaguesMockResponse}
      />
    );
    return itemLoadingTile;
  };

  beforeEach(() => {
    wrapper = null;

    FetchLeagues.fetchLeagues.mockImplementationOnce(() => {
      return fetchLeaguesMockResponse;
    });

    FetchItems.fetchItems.mockImplementationOnce(() => {
      return fetchItemsMockResponse;
    });

    tile = initialByType("poeNinjaItemTile");
    tile.data.loading = true;
    tile.data.itemLeague = "Standard";
    tile.data.itemType = "Currency";
  });

  it("renders loader icon", async () => {
    wrapper = await mount();
    expect(wrapper.find("svg")).toHaveLength(1);
  });

  it("calls `updateTile` with tile's `itemLoading` set to false", async () => {
    wrapper = await mount();

    tile.data.loading = false;
    expect(updateTile).toHaveBeenCalledWith(tile);
  });

  it("calls `fetchItems` with league id and item type", async () => {
    const spy = jest.spyOn(FetchItems, "fetchItems");

    wrapper = await mount();

    expect(spy).toHaveBeenCalledWith(
      tile.data.itemType,
      fetchLeaguesMockResponse[0].id
    );
  });

  it("calls `transformer` with fetched items", async () => {
    const spy = jest.spyOn(Transformer, "transformer");

    wrapper = await mount();

    expect(spy).toHaveBeenCalledWith(fetchItemsMockResponse);
  });

  it("calls `updateTile` with tile's `data.items` set to transformed data", async () => {
    Transformer.transformer.mockImplementationOnce(() => {
      return [fetchItemsMockResponse.currencyDetails];
    });

    wrapper = await mount();

    tile.data.items = [fetchItemsMockResponse.currencyDetails];
    expect(updateTile).toHaveBeenCalledWith(tile);
  });

  describe("when item is already selected", () => {
    beforeEach(() => {
      tile.data.itemType = "Currency";
      tile.data.itemId = 1;
    });

    it("calls `updateTile` with tile's `data.item` set to transformed data", async () => {
      Transformer.transformer.mockImplementationOnce(() => {
        return [fetchItemsMockResponse.currencyDetails];
      });

      wrapper = await mount();

      tile.data.item = fetchItemsMockResponse.currencyDetails;
      expect(updateTile).toHaveBeenCalledWith(tile);
    });
  });
});
