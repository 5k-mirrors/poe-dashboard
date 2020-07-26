import React from "react";
import { Normalize } from "styled-normalize";
import GlobalStyle from "../../common_styles/globalStyle";
import Grid from "../Grid/Grid";
import Header from "../UI/Header/Header";
import Footer from "../UI/Footer/Footer";

class Root extends React.Component {
  constructor() {
    super();
    this.ref = React.createRef();

    this.setRef = this.setRef.bind(this);
    this.onAddTile = this.onAddTile.bind(this);
    this.onClearGrid = this.onClearGrid.bind(this);
  }

  onAddTile() {
    this.ref.onAddTile();
  }

  onClearGrid() {
    if (this.ref.state.layout && this.ref.state.tiles.length > 0) {
      this.ref.onClearGrid();
    }
  }

  setRef(ref) {
    this.ref = ref;
  }

  render() {
    // suppressMultiMountWarning: https://github.com/styled-components/styled-components/issues/2122
    return (
      <React.Fragment>
        <Normalize suppressMultiMountWarning />
        <GlobalStyle suppressMultiMountWarning />
        <Header
          onAddTileSubmit={this.onAddTile}
          onClearGridSubmit={this.onClearGrid}
          suppressMultiMountWarning
        />
        <Grid setRef={this.setRef} />
        <Footer suppressMultiMountWarning />
      </React.Fragment>
    );
  }
}

export default Root;
