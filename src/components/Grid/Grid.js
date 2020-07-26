import React, { Component } from "react";
import { addUrlProps } from "react-url-query";
import mapUrlToProps from "../../utils/ReactUrlQuery/mapUrlToProps/mapUrlToProps";
import mapUrlChangeHandlersToProps from "../../utils/ReactUrlQuery/mapUrlChangedHandlersToProps/mapUrlChangedHandlersToProps";
import GridDisplayer from "./GridDisplayer/GridDisplayer";
import DefaultProps from "./ReactGridLayout/DefaultProps";
import * as ReactAppUtils from "../../utils/ReactApp/ReactAppUtils";
import * as TileUtils from "../../utils/TileUtils/TileUtils";
import * as Tiles from "../../resources/Tiles/Tiles";
import LeagueInfoBar from "../UI/LeagueInfoBar/LeagueInfoBar";

import DefaultLeagues from "../../resources/DefaultLeagues/DefaultLeagues";
import * as FetchLeagues from "../../utils/Api/Ggg/FetchLeagues";
import * as GridUtils from "../../utils/GridUtils/GridUtils";

class Grid extends Component {
  static defaultProps = DefaultProps;

  constructor(props) {
    super(props);

    this.state = {
      tiles: [],
      layout: [],
      leagues: [],
      leaguesAreUpdatable: false,
      updatingLeagues: false
    };

    this.numberOfColumns = 4;
    this.onAddTile = this.onAddTile.bind(this);
    this.onClearGrid = this.onClearGrid.bind(this);
    this.onRemoveTile = this.onRemoveTile.bind(this);
    this.updateTile = this.updateTile.bind(this);
    this.updateLeagues = this.updateLeagues.bind(this);
  }

  componentDidMount() {
    const { setRef } = this.props;
    setRef(this);

    let { tiles, layout, leagues } = this.readStore(this.props);

    const newVisitor = ReactAppUtils.newVisitor();
    this.setLeaguesTimeout();

    if (newVisitor && tiles.length === 0) {
      tiles = Tiles.defaultTiles();
      layout = this.generateLayout(tiles, layout);
    }

    if (leagues.length === 0) {
      leagues = DefaultLeagues;
    }

    this.writeStore({ tiles, layout, leagues });

    if (newVisitor) {
      ReactAppUtils.setRecurringVisitor();
    }

    window.addEventListener("beforeunload", clearTimeout);
  }

  onAddTile() {
    const {
      tiles: [...tiles],
      layout: [...layout]
    } = this.state;

    tiles.push(Tiles.initialByType("poeNinjaItemTile"));

    this.writeStore({ tiles, layout: this.generateLayout(tiles, layout) });
  }

  onRemoveTile(tileID) {
    const {
      tiles: [...tiles],
      layout: [...layout]
    } = this.state;

    const updatedTiles = tiles.filter(tile => tile.id !== tileID);
    const updatedLayout = this.generateLayout(updatedTiles, layout);

    this.writeStore({ tiles: updatedTiles, layout: updatedLayout });
  }

  onClearGrid() {
    this.writeStore({ tiles: [], layout: [] });
  }

  onLayoutChange = layout => {
    const {
      tiles: [...tiles]
    } = this.state;

    this.writeStore({ tiles, layout });
  };

  setLeaguesTimeout() {
    let remainingTime = GridUtils.GetLeaguesUpdateRemainingTime();

    if (remainingTime <= 0) {
      remainingTime = 0;
    }

    setTimeout(() => {
      this.setState({
        leaguesAreUpdatable: true
      });
    }, remainingTime);
  }

  generateLayout = (tiles, layout) => {
    return tiles.map(tile => {
      const layoutItem = layout.find(item => tile.id === item.i);

      if (layoutItem) {
        return layoutItem;
      }
      return {
        i: tile.id,
        id: tile.id,
        // The `||` is so that we can place default tiles. A better algorithm should resolve this.
        x: tile.x || Math.floor(Math.random() * this.numberOfColumns),
        y: tile.y || 1,
        w: 1,
        h: 1
      };
    });
  };

  readStore(props) {
    const localStorageTiles = ReactAppUtils.getParsedLocalStorageItem("tiles");
    const localStorageLayout = ReactAppUtils.getParsedLocalStorageItem(
      "layout"
    );
    const localStorageLeagues = ReactAppUtils.getParsedLocalStorageItem(
      "leagues"
    );

    const urlTiles = props.tiles ? [...props.tiles] : null;
    const urlLayout = props.layout ? [...props.layout] : null;
    const urlLeagues = props.leagues ? [...props.leagues] : null;

    const {
      tiles: [...stateTiles],
      layout: [...stateLayout],
      leagues: [...stateLeagues]
    } = this.state;

    return {
      tiles: urlTiles || localStorageTiles || stateTiles,
      layout: urlLayout || localStorageLayout || stateLayout,
      leagues: urlLeagues || localStorageLeagues || stateLeagues
    };
  }

  writeStore(data) {
    const {
      mapChangedTilesToUrl,
      mapChangedLayoutToUrl,
      mapChangedLeaguesToUrl
    } = this.props;

    const {
      tiles: [...tiles],
      layout: [...layout]
    } = data;

    if (data.leagues) {
      const {
        leagues: [...leagues]
      } = data;

      this.setState({
        leagues
      });

      localStorage.setItem("leagues", JSON.stringify(leagues));
      mapChangedLeaguesToUrl(leagues);
    }

    this.setState({
      tiles,
      layout
    });

    const tilesWithFilteredData = TileUtils.filterDataToStore(tiles);

    localStorage.setItem("tiles", JSON.stringify(tilesWithFilteredData));
    mapChangedTilesToUrl(tilesWithFilteredData);

    localStorage.setItem("layout", JSON.stringify(layout));
    mapChangedLayoutToUrl(layout);
  }

  async updateLeagues() {
    const {
      tiles: [...tiles],
      layout: [...layout],
      leagues: [...currentLeagues]
    } = this.state;

    this.setState({
      leaguesAreUpdatable: false,
      updatingLeagues: true
    });

    const fetchedLeagues = await FetchLeagues.fetchLeagues();

    localStorage.setItem("lastLeaguesUpdateTime", new Date().getTime());

    if (JSON.stringify(currentLeagues) === JSON.stringify(fetchedLeagues)) {
      this.setState({ updatingLeagues: false });
      return;
    }

    this.writeStore({ leagues: fetchedLeagues, tiles, layout });

    window.location.reload();
  }

  updateTile(updatedTile) {
    const {
      tiles: [...tiles],
      layout: [...layout]
    } = this.state;
    const tileIndex = tiles.findIndex(tile => tile.id === updatedTile.id);

    tiles[tileIndex] = { ...updatedTile };

    this.writeStore({ tiles, layout });
  }

  render() {
    const {
      tiles: [...tiles],
      layout: [...layout],
      leagues: [...leagues],
      leaguesAreUpdatable,
      updatingLeagues
    } = this.state;

    return (
      <div>
        <LeagueInfoBar
          leagues={leagues}
          updateLeagues={this.updateLeagues}
          disableUpdateButton={!leaguesAreUpdatable}
          updatingLeagues={updatingLeagues}
        />
        <GridDisplayer
          onLayoutChange={this.onLayoutChange}
          layout={layout}
          tiles={tiles}
          onRemoveTile={this.onRemoveTile}
          updateTile={this.updateTile}
          saveToLocalStorage={this.saveToLocalStorage}
          leagues={leagues}
        />
      </div>
    );
  }
}

export default addUrlProps({
  mapUrlToProps,
  mapUrlChangeHandlersToProps
})(Grid);
