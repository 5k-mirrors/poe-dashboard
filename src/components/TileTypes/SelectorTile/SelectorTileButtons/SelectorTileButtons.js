import React from "react";
import styled from "styled-components";
import { SelectorButtonsContainer } from "./SelectorTileButtons.style";
import acceptIcon from "../../../../resources/assets/SVGIcons/Accept/Accept.svg";
import cancelIcon from "../../../../resources/assets/SVGIcons/Cancel/Cancel.svg";

const selectorTileButtons = ({ onSave, onCancel, isDisabled }) => {
  const StyledSelectorButtonsContainer = styled.div`
    ${SelectorButtonsContainer}
  `;

  return (
    <StyledSelectorButtonsContainer>
      <button
        type="button"
        onClick={() => onSave()}
        onMouseDown={e => e.stopPropagation()}
        disabled={isDisabled}
      >
        <img src={acceptIcon} alt="Accept" />
      </button>
      <button
        type="button"
        onClick={() => onCancel()}
        onMouseDown={e => e.stopPropagation()}
      >
        <img src={cancelIcon} alt="Cancel" />
      </button>
    </StyledSelectorButtonsContainer>
  );
};

export default selectorTileButtons;
