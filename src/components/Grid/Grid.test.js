import React from "react";
import createHistory from "history/createBrowserHistory";
import { configureUrlQuery } from "react-url-query";
import ShallowWrappedComponent from "../../utils/ShallowWrappedComponent/ShallowWrappedComponent";
import mapUrlToProps from "../../utils/ReactUrlQuery/mapUrlToProps/mapUrlToProps";
import Grid from "./Grid";
import GridDisplayer from "./GridDisplayer/GridDisplayer";
import LeagueInfoBar from "../UI/LeagueInfoBar/LeagueInfoBar";
import * as ReactAppUtils from "../../utils/ReactApp/ReactAppUtils";
import * as Tiles from "../../resources/Tiles/Tiles";
import * as FetchLeagues from "../../utils/Api/Ggg/FetchLeagues";
import * as GridUtils from "../../utils/GridUtils/GridUtils";

jest.mock("../../utils/ReactUrlQuery/mapUrlToProps/mapUrlToProps", () => {
  return require
    .requireActual("../../utils/Test/TestUtils")
    .mockOriginalFunctionality(
      "../../utils/ReactUrlQuery/mapUrlToProps/mapUrlToProps"
    );
});

jest.mock("../../resources/Tiles/Tiles", () => {
  return require
    .requireActual("../../utils/Test/TestUtils")
    .mockOriginalFunctionality("../../resources/Tiles/Tiles");
});

jest.mock("../../utils/UniqueIdGenerator/UniqueIdGenerator", () => {
  return require
    .requireActual("../../utils/Test/TestUtils")
    .mockOriginalFunctionality(
      "../../utils/UniqueIdGenerator/UniqueIdGenerator"
    );
});

jest.mock("../../utils/ReactApp/ReactAppUtils", () => {
  return require
    .requireActual("../../utils/Test/TestUtils")
    .mockOriginalFunctionality("../../utils/ReactApp/ReactAppUtils");
});

jest.mock("../../utils/Api/Ggg/FetchLeagues", () => {
  return require
    .requireActual("../../utils/Test/TestUtils")
    .mockOriginalFunctionality("../../utils/Api/Ggg/FetchLeagues");
});

jest.mock("../../utils/GridUtils/GridUtils", () => {
  return require
    .requireActual("../../utils/Test/TestUtils")
    .mockOriginalFunctionality("../../utils/GridUtils/GridUtils");
});

describe("<Grid />", () => {
  let wrapper;

  const exampleTile = {
    id: "fs22",
    currentlyEditing: false
  };

  beforeEach(() => {
    localStorage.clear();
    wrapper = null;

    // Getting rid of warnings
    const history = createHistory();
    configureUrlQuery({ history });

    mapUrlToProps.mockImplementation(() => {
      return {
        tiles: [],
        layout: [],
        leagues: []
      };
    });

    localStorage.setItem("recurringVisitor", true);
  });

  it("renders GridDisplayer", () => {
    wrapper = ShallowWrappedComponent(<Grid setRef={jest.fn()} />);

    expect(wrapper.find(GridDisplayer)).toHaveLength(1);
  });

  it("renders LeagueInfoBar", () => {
    wrapper = ShallowWrappedComponent(<Grid setRef={jest.fn()} />);

    expect(wrapper.find(LeagueInfoBar)).toHaveLength(1);
  });

  describe("componentDidMount", () => {
    beforeEach(() => {
      jest.spyOn(window, "addEventListener");
      wrapper = ShallowWrappedComponent(<Grid setRef={jest.fn()} />);
    });

    it("calls addEventListener with `beforeunload` and clearTimeout function", () => {
      expect(window.addEventListener).toHaveBeenCalledWith(
        "beforeunload",
        clearTimeout
      );
    });
  });

  describe("setLeaguesTimeout", () => {
    beforeEach(() => {
      jest.useFakeTimers();

      wrapper = ShallowWrappedComponent(<Grid setRef={jest.fn()} />);
    });

    describe("when `remainingTime` is less than or equal to zero", () => {
      it("calls setTimeout with zero", () => {
        GridUtils.GetLeaguesUpdateRemainingTime.mockImplementationOnce(() => 0);

        wrapper.instance().setLeaguesTimeout();

        expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 0);
      });
    });

    describe("when `remainingTime` is greater than zero", () => {
      it("calls setTimeout with `remainingTime`", () => {
        const remainingTime = 40000;
        GridUtils.GetLeaguesUpdateRemainingTime.mockImplementationOnce(
          () => remainingTime
        );

        wrapper.instance().setLeaguesTimeout();

        expect(setTimeout).toHaveBeenCalledWith(
          expect.any(Function),
          remainingTime
        );
      });
    });

    describe("when `remainingTime` has not expired yet", () => {
      it("does not set `leaguesAreUpdatable` to true", () => {
        const remainingTime = 40000;
        GridUtils.GetLeaguesUpdateRemainingTime.mockImplementationOnce(
          () => remainingTime
        );

        wrapper.instance().setLeaguesTimeout();

        expect(wrapper.state("leaguesAreUpdatable")).toBeFalsy();
      });
    });

    describe("when `remainingTime` has expired", () => {
      it("sets `leaguesAreUpdatable` to true", () => {
        const remainingTime = 40000;
        GridUtils.GetLeaguesUpdateRemainingTime.mockImplementationOnce(
          () => remainingTime
        );

        wrapper.instance().setLeaguesTimeout();
        jest.runAllTimers();

        expect(wrapper.state("leaguesAreUpdatable")).toBeTruthy();
      });
    });
  });

  describe("writeStore", () => {
    const dataWithoutLeagues = { tiles: [{ id: 1 }], layout: [{ id: 2 }] };

    beforeEach(() => {
      wrapper = ShallowWrappedComponent(<Grid setRef={jest.fn()} />);
    });

    it("sets the layout in the state", () => {
      wrapper.instance().writeStore(dataWithoutLeagues);

      expect(wrapper.state("layout")).toEqual(dataWithoutLeagues.layout);
    });

    it("sets the tiles in the state", () => {
      wrapper.instance().writeStore(dataWithoutLeagues);

      expect(wrapper.state("tiles")).toEqual(dataWithoutLeagues.tiles);
    });

    it("sets the layout in the localStorage", () => {
      wrapper.instance().writeStore(dataWithoutLeagues);

      expect(JSON.parse(localStorage.__STORE__.layout)).toEqual(
        dataWithoutLeagues.layout
      );
    });

    it("sets the tiles in the localStorage", () => {
      wrapper.instance().writeStore(dataWithoutLeagues);

      expect(JSON.parse(localStorage.__STORE__.tiles)).toEqual(
        dataWithoutLeagues.tiles
      );
    });

    it("calls mapChangedLayoutToUrl with layout", () => {
      const mapChangedLayoutToUrl = jest.fn();
      wrapper.setProps({ mapChangedLayoutToUrl });

      wrapper.instance().writeStore(dataWithoutLeagues);

      expect(mapChangedLayoutToUrl).toHaveBeenCalledWith(
        dataWithoutLeagues.layout
      );
    });

    it("calls mapChangedTilesToUrl with tiles", () => {
      const mapChangedTilesToUrl = jest.fn();
      wrapper.setProps({ mapChangedTilesToUrl });

      wrapper.instance().writeStore(dataWithoutLeagues);

      expect(mapChangedTilesToUrl).toHaveBeenCalledWith(
        dataWithoutLeagues.tiles
      );
    });

    describe("when `data.leagues` is not defined", () => {
      it("does not call `mapChangedLeaguesToUrl`", () => {
        const mapChangedLeaguesToUrl = jest.fn();
        wrapper.setProps({ mapChangedLeaguesToUrl });

        wrapper.instance().writeStore(dataWithoutLeagues);

        expect(mapChangedLeaguesToUrl).not.toHaveBeenCalled();
      });
    });

    describe("when `data.leagues` is defined", () => {
      const dataWithLeagues = {
        ...dataWithoutLeagues,
        leagues: [
          {
            id: "Betrayal",
            name: "Temp SC"
          }
        ]
      };

      it("sets the leagues in the state", () => {
        wrapper.instance().writeStore(dataWithLeagues);

        expect(wrapper.state("leagues")).toEqual(dataWithLeagues.leagues);
      });

      it("sets the leagues in the localStorage", () => {
        wrapper.instance().writeStore(dataWithLeagues);

        expect(JSON.parse(localStorage.__STORE__.leagues)).toEqual(
          dataWithLeagues.leagues
        );
      });

      it("calls `mapChangedLeaguesToUrl` with leagues", () => {
        const mapChangedLeaguesToUrl = jest.fn();
        wrapper.setProps({ mapChangedLeaguesToUrl });

        wrapper.instance().writeStore(dataWithLeagues);

        expect(mapChangedLeaguesToUrl).toHaveBeenCalledWith(
          dataWithLeagues.leagues
        );
      });
    });
  });

  describe("updateLeagues", () => {
    beforeEach(() => {
      wrapper = ShallowWrappedComponent(<Grid setRef={jest.fn()} />);

      // In order to get rid of the following error:
      // Error: Not implemented: navigation (except hash changes)
      window.location.reload = jest.fn();
    });

    it("sets `leaguesAreUpdatable` to false", () => {
      wrapper.instance().updateLeagues();

      expect(wrapper.state("leaguesAreUpdatable")).toBeFalsy();
    });

    it("sets `updatingLeagues` to true", () => {
      wrapper.instance().updateLeagues();

      expect(wrapper.state("updatingLeagues")).toBeTruthy();
    });

    it("calls FetchLeagues.fetchLeagues", () => {
      wrapper.instance().updateLeagues();

      expect(FetchLeagues.fetchLeagues).toHaveBeenCalled();
    });

    describe("when the current leagues are equal to the fetched leagues", () => {
      const currentLeagues = [
        {
          id: "Betrayal",
          name: "Temp SC"
        }
      ];

      const fetchedLeagues = [
        {
          id: "Betrayal",
          name: "Temp SC"
        }
      ];

      beforeEach(() => {
        FetchLeagues.fetchLeagues.mockImplementationOnce(() => fetchedLeagues);
        wrapper.setState({ leagues: currentLeagues });
      });

      it("sets `updatingLeagues` to false", () => {
        wrapper.instance().updateLeagues();

        expect(wrapper.state.updatingLeagues).toBeFalsy();
      });

      it("does not call `writeStore`", () => {
        const writeStoreSpy = jest.spyOn(wrapper.instance(), "writeStore");

        wrapper.instance().updateLeagues();

        expect(writeStoreSpy).not.toHaveBeenCalled();
      });

      it("does not reload the page", () => {
        wrapper.instance().updateLeagues();

        expect(window.location.reload).not.toHaveBeenCalled();
      });
    });

    describe("when the current leagues are not equal to the fetched leagues", () => {
      const currentLeagues = [
        {
          id: "Betrayal",
          name: "Temp SC"
        }
      ];

      const fetchedLeagues = [
        {
          id: "Synthesis",
          name: "Temp SC"
        }
      ];

      beforeEach(() => {
        FetchLeagues.fetchLeagues.mockImplementationOnce(() => fetchedLeagues);
        wrapper.setState({ leagues: currentLeagues });
      });

      it("calls writeStore with `fetchedLeagues`, `tiles` and `layout`", async () => {
        const wrapperStateTiles = wrapper.state("tiles");
        const wrapperStateLayout = wrapper.state("layout");
        const writeStoreSpy = jest.spyOn(wrapper.instance(), "writeStore");

        await wrapper.instance().updateLeagues();

        const expectedObject = {
          leagues: fetchedLeagues,
          tiles: wrapperStateTiles,
          layout: wrapperStateLayout
        };

        expect(writeStoreSpy).toHaveBeenCalledWith(expectedObject);
      });

      it("reloads the page", async () => {
        await wrapper.instance().updateLeagues();

        expect(window.location.reload).toHaveBeenCalled();
      });
    });
  });

  describe("onAddTile", () => {
    it("adds a tile to state", () => {
      wrapper = ShallowWrappedComponent(<Grid setRef={jest.fn()} />);
      wrapper.instance().onAddTile();

      expect(wrapper.state("tiles")).toHaveLength(1);
    });

    it("calls `Tiles.initialByType` with `poeNinjaItemTile`", () => {
      const spy = jest.spyOn(Tiles, "initialByType");

      wrapper = ShallowWrappedComponent(<Grid setRef={jest.fn()} />);
      wrapper.instance().onAddTile();

      expect(spy).toHaveBeenCalledWith("poeNinjaItemTile");
    });

    it("adds a tile with `Tiles.initialByType` values", () => {
      Tiles.initialByType.mockImplementationOnce(() => {
        return {
          id: "abc"
        };
      });

      wrapper = ShallowWrappedComponent(<Grid setRef={jest.fn()} />);
      wrapper.instance().onAddTile();

      expect(wrapper.state("tiles")[0]).toEqual({
        id: "abc"
      });
    });

    it("calls writeStore with updated tiles (added a tile with `Tiles.initialByType` values)", () => {
      wrapper = ShallowWrappedComponent(<Grid setRef={jest.fn()} />);
      const spy = jest.spyOn(wrapper.instance(), "writeStore");
      Tiles.initialByType.mockImplementationOnce(() => {
        return {
          id: "abc"
        };
      });

      wrapper.instance().onAddTile();

      expect(spy).toHaveBeenCalledWith({
        tiles: [
          {
            id: "abc"
          }
        ],
        layout: expect.anything()
      });
    });
  });

  describe("when there are no items in the URL", () => {
    beforeEach(() => {
      mapUrlToProps.mockReturnValueOnce(() => null);
    });

    describe("when user is new visitor", () => {
      beforeEach(() => {
        ReactAppUtils.newVisitor.mockImplementationOnce(() => {
          return true;
        });
      });

      it("renders GridDisplayer with default tiles", () => {
        wrapper = ShallowWrappedComponent(<Grid setRef={jest.fn()} />);

        expect(wrapper.find(GridDisplayer).prop("tiles")).toHaveLength(
          Tiles.defaultTiles().length
        );
      });

      it("call `setRecurringVisitor` on ReactAppUtils", () => {
        const spy = jest.spyOn(ReactAppUtils, "setRecurringVisitor");

        ShallowWrappedComponent(<Grid setRef={jest.fn()} />);

        expect(spy).toHaveBeenCalled();
      });
    });

    describe("when user is not a new visitor", () => {
      beforeEach(() => {
        ReactAppUtils.newVisitor.mockImplementationOnce(() => {
          return false;
        });
      });

      it("renders GridDisplayer with no tiles", () => {
        wrapper = ShallowWrappedComponent(<Grid setRef={jest.fn()} />);

        expect(wrapper.find(GridDisplayer).prop("tiles")).toHaveLength(0);
      });
    });
  });

  describe("onRemoveTile", () => {
    describe("when there's a tile in the state", () => {
      beforeEach(() => {
        wrapper = ShallowWrappedComponent(<Grid setRef={jest.fn()} />);
        wrapper.setState({ tiles: [exampleTile] });
      });

      it("removes tile", () => {
        const tiles = wrapper.state("tiles");
        wrapper.instance().onRemoveTile(tiles[0].id);

        expect(wrapper.state("tiles")).toHaveLength(0);
      });

      it("calls writeStore with updated tiles", () => {
        const spy = jest.spyOn(wrapper.instance(), "writeStore");
        const tiles = wrapper.state("tiles");

        wrapper.instance().onRemoveTile(tiles[0].id);

        expect(spy).toHaveBeenCalledWith({
          tiles: [],
          layout: expect.anything()
        });
      });
    });
  });

  describe("updateTile", () => {
    const newTile = {
      id: "fs22",
      currentlyEditing: true
    };

    describe("when there's a tile in the state", () => {
      beforeEach(() => {
        wrapper = ShallowWrappedComponent(<Grid setRef={jest.fn()} />);
        wrapper.setState({ tiles: [exampleTile] });
      });

      it("calls writeStore with updated tiles and layout in state", () => {
        const spy = jest.spyOn(wrapper.instance(), "writeStore");

        wrapper.instance().updateTile(newTile);

        expect(spy).toHaveBeenCalledWith({
          tiles: [newTile],
          layout: wrapper.state("layout")
        });
      });
    });
  });

  describe("onLayoutChange", () => {
    it("calls writeStore with passed layout and tiles in state", () => {
      wrapper = ShallowWrappedComponent(<Grid setRef={jest.fn()} />);
      const spy = jest.spyOn(wrapper.instance(), "writeStore");
      const layout = [{ id: 1 }];

      wrapper.instance().onLayoutChange(layout);

      expect(spy).toHaveBeenCalledWith({
        tiles: wrapper.state("tiles"),
        layout
      });
    });
  });

  describe("onClearGrid", () => {
    it("calls writeStore with empty arrays", () => {
      wrapper = ShallowWrappedComponent(<Grid setRef={jest.fn()} />);
      const spy = jest.spyOn(wrapper.instance(), "writeStore");

      wrapper.instance().onLayoutChange([]);

      expect(spy).toHaveBeenCalledWith({
        tiles: [],
        layout: []
      });
    });
  });
});
