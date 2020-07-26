import React from "react";
import { ErrorDiv, ErrorContentDiv, DeleteButton } from "./ErrorTile.style";
import DeleteIcon from "../../../resources/assets/SVGIcons/Delete/Delete.svg";

const errorTile = props => {
  const { error, onRemoveTile, tile } = props;
  return (
    <ErrorDiv>
      <ErrorContentDiv>{error || tile.data.error}</ErrorContentDiv>
      <DeleteButton
        type="button"
        onClick={() => onRemoveTile(tile.id)}
        onMouseDown={e => e.stopPropagation()}
      >
        <img src={DeleteIcon} alt="Delete" />
      </DeleteButton>
    </ErrorDiv>
  );
};

export default errorTile;
