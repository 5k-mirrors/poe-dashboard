import React from "react";
import DeleteIcon from "../../../resources/assets/SVGIcons/Delete/Delete.svg";
import {
  MainHeader,
  HeaderTitle,
  HeaderRightIcons,
  HeaderCenterButton,
  LogoDiv,
  ClearGridButton,
  BetaFlag,
  BetaParagraph
} from "./Header.style";
import ReloadIcon from "./NewContentReload/NewContentReload";
import addTileIcon from "../../../resources/assets/SVGIcons/AddTile/AddTile.svg";
import gitHubIcon from "../../../resources/assets/SVGIcons/GitHub/GitHub.svg";

const header = props => {
  const { onAddTileSubmit, onClearGridSubmit } = props;
  return (
    <MainHeader>
      <HeaderTitle>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/5k-mirrors"
        >
          <LogoDiv />
        </a>
        <p>PoE Dashboard</p>
      </HeaderTitle>
      <HeaderCenterButton onClick={onAddTileSubmit}>
        <img src={addTileIcon} alt="Add Tile" />
      </HeaderCenterButton>
      <HeaderRightIcons>
        <ReloadIcon />
        <ClearGridButton onClick={onClearGridSubmit}>
          <img src={DeleteIcon} alt="Delete" />
        </ClearGridButton>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/5k-mirrors/poe-dashboard"
        >
          <img src={gitHubIcon} alt="Add Tile" />
        </a>
        <BetaFlag>
          <h5>BETA</h5>
        </BetaFlag>
        <BetaParagraph>
          We might introduce breaking changes which means sometimes the board
          will have to be recreated.
        </BetaParagraph>
      </HeaderRightIcons>
    </MainHeader>
  );
};

export default header;
