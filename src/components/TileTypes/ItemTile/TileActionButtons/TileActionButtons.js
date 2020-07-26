import React from "react";
import styled from "styled-components";
import { ActionButtonsContainer } from "./TileActionButtons.style";
import deleteIcon from "../../../../resources/assets/SVGIcons/Delete/Delete.svg";
import editIcon from "../../../../resources/assets/SVGIcons/Edit/Edit.svg";

const tileActionButtons = ({ onRemove, tile, updateTile }) => {
  const tileCopy = { ...tile };
  const StyledButtonsContainer = styled.div`
    ${ActionButtonsContainer}
  `;

  return (
    <StyledButtonsContainer>
      <button
        type="button"
        onMouseDown={e => e.stopPropagation()}
        onClick={() => {
          tileCopy.data.editing = true;
          updateTile(tileCopy);
        }}
      >
        <img src={editIcon} alt="Edit" />
      </button>
      <button
        type="button"
        onClick={() => onRemove(tile.id)}
        onMouseDown={e => e.stopPropagation()}
      >
        <img src={deleteIcon} alt="Delete" />
      </button>
    </StyledButtonsContainer>
  );
};

export default tileActionButtons;
