import React, { Component } from "react";
import Selectors from "../../Selectors/Selectors";
import ItemSelector from "../../Selectors/ItemSelector/ItemSelector";
import { GridDiv, ItemsSelectorDiv, Title } from "./SelectorTile.style";
import SelectorTileButtons from "./SelectorTileButtons/SelectorTileButtons";

class SelectorTile extends Component {
  constructor(props) {
    super(props);

    this.tile = { ...props.tile };
    this.updateTile = props.updateTile;

    this.onSelection = this.onSelection.bind(this);
    this.onSaveItem = this.onSaveItem.bind(this);
    this.onItemNameSelection = this.onItemNameSelection.bind(this);
    this.onCancelItem = this.onCancelItem.bind(this);
  }

  onSelection(fieldName, value) {
    this.tile.data[fieldName] = value;

    if (this.tile.data.editedItemLeague && this.tile.data.editedItemType) {
      this.tile.data.editedItemName = null;
      this.tile.data.loading = true;
      this.updateTile(this.tile);
    }
  }

  onItemNameSelection(value) {
    if (value && typeof value === "number") {
      const itemName = this.tile.data.items.find(item => item.id === value)
        .name;

      this.tile.data.editedItemName = itemName;
      this.tile.data.editedItemId = value;
    } else {
      this.tile.data.editedItemName = null;
      this.tile.data.editedItemId = null;
    }

    this.updateTile(this.tile);
  }

  onSaveItem() {
    this.confirmEdit();

    const {
      items: [...items]
    } = this.tile.data;
    const item = items.find(i => this.tile.data.itemId === i.id);

    this.tile.data.item = item;
    this.tile.data.items = null;
    this.tile.data.editing = false;
    this.tile.data.submitted = true;

    this.updateTile(this.tile);
  }

  onCancelItem() {
    this.removeEdits();

    const { onRemoveTile } = this.props;
    if (!this.tile.data.itemName) {
      onRemoveTile(this.tile.id);
    } else {
      this.tile.data.items = null;
      this.tile.data.editing = false;
      this.updateTile(this.tile);
    }
  }

  confirmEdit() {
    this.tile.data.itemName = this.tile.data.editedItemName;
    this.tile.data.itemId = this.tile.data.editedItemId;
    this.tile.data.itemLeague = this.tile.data.editedItemLeague;
    this.tile.data.itemType = this.tile.data.editedItemType;

    this.removeEdits();
  }

  removeEdits() {
    this.tile.data.editedItemName = null;
    this.tile.data.editedItemId = null;
    this.tile.data.editedItemLeague = null;
    this.tile.data.editedItemType = null;
  }

  isSaveButtonDisabled() {
    const { editedItemLeague, editedItemType, editedItemName } = this.tile.data;
    if (!editedItemLeague || !editedItemType || !editedItemName) {
      return true;
    }

    return false;
  }

  render() {
    let itemSelectorDisplayer = null;
    if (this.tile.data.items) {
      itemSelectorDisplayer = (
        <ItemSelector
          itemSelection={this.onItemNameSelection}
          items={this.tile.data.items}
        />
      );
    }
    return (
      <GridDiv>
        <Title>Select item</Title>
        <Selectors selectorChanged={this.onSelection} tile={this.tile} />
        <ItemsSelectorDiv>
          {itemSelectorDisplayer}
          <SelectorTileButtons
            onSave={this.onSaveItem}
            onCancel={this.onCancelItem}
            isDisabled={this.isSaveButtonDisabled()}
          />
        </ItemsSelectorDiv>
      </GridDiv>
    );
  }
}

export default SelectorTile;
