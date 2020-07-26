import React, { Component } from "react";
import { LoaderDiv } from "./ItemLoadingTile.style";
import loaderIcon from "../../../resources/assets/SVGIcons/Loader/Loader";
import * as Transformer from "../../../utils/Api/PoeNinja/DataTransformers/Transformer";
import * as FetchItems from "../../../utils/Api/PoeNinja/FetchItems/FetchItems";

class ItemLoadingTile extends Component {
  constructor(props) {
    super(props);

    this.tile = { ...props.tile };
    this.updateTile = props.updateTile;
    this.leagues = [...props.leagues];
  }

  async componentDidMount() {
    const {
      editedItemLeague,
      editedItemType,
      itemLeague,
      itemType
    } = this.tile.data;
    const league = editedItemLeague || itemLeague;
    const type = editedItemType || itemType;

    if (!this.leagues) {
      this.setLeagueFetchError();
      this.updateTile(this.tile);
      return;
    }

    const leagueId = this.leagues.filter(element => {
      return element.name === league;
    })[0].id;

    const items = await FetchItems.fetchItems(type, leagueId);

    if (!items) {
      this.setItemFetchError();
      this.updateTile(this.tile);
      return;
    }

    const data = Transformer.transformer(items);

    if (!data) {
      this.setItemFetchError();
      this.updateTile(this.tile);
      return;
    }

    if (this.itemAlreadySelected()) {
      this.tile.data.item = data.find(
        item => this.tile.data.itemId === item.id
      );
    } else {
      this.tile.data.items = data;
    }

    this.tile.data.loading = false;

    this.updateTile(this.tile);
  }

  setLeagueFetchError() {
    this.tile.data.error =
      "Something went wrong while fetching leagues. Try again a bit later.";
  }

  setItemFetchError() {
    this.tile.data.error =
      "Something went wrong while fetching items. Should temp leagues be updated?";
  }

  itemAlreadySelected() {
    // This happens when loading from URL/LocalStorage
    return (
      this.tile.data.itemId &&
      !(this.tile.data.editedItemType || this.tile.data.editedItemLeague)
    );
  }

  render() {
    return <LoaderDiv>{loaderIcon()}</LoaderDiv>;
  }
}

export default ItemLoadingTile;
