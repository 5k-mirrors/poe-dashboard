import React, { Component } from "react";
import Pick from "object.pick";
import ReactGridLayout from "../ReactGridLayout/ReactGridLayout";
import DefaultProps from "../ReactGridLayout/DefaultProps";
import * as TileTypeSelector from "../../TileTypes/TileTypeSelector/TileTypeSelector";

import "../../../../node_modules/react-grid-layout/css/styles.css";
import "../../../../node_modules/react-resizable/css/styles.css";

import { TileDiv } from "./GridDisplayer.style";

class GridDisplayer extends Component {
  static defaultProps = DefaultProps;

  constructor(props) {
    super(props);

    this.onLayoutChange = props.onLayoutChange;
  }

  createItem = layoutItem => {
    const { tiles } = this.props;
    const tile = tiles.find(t => t.id === layoutItem.i);
    const extractedProps = Pick(this.props, [
      "onRemoveTile",
      "updateTile",
      "leagues"
    ]);

    const tileDisplayer = (
      <TileDiv data-grid={layoutItem} key={layoutItem.i}>
        {TileTypeSelector.getTile({
          tile,
          ...extractedProps
        })}
      </TileDiv>
    );

    return tileDisplayer;
  };

  render() {
    const { layout } = this.props;

    return (
      <ReactGridLayout onLayoutChange={this.onLayoutChange} {...this.props}>
        {layout.map(layoutItem => this.createItem(layoutItem))}
      </ReactGridLayout>
    );
  }
}

export default GridDisplayer;
