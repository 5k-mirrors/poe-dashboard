import { css } from "styled-components";

const selectorTileElementHeight = "5px";

export const SelectorButtonsContainer = css`
  display: grid;
  grid-template-columns: 50% 50%;

  & > button {
    display: flex;
    flex-direction: row;
    outline: none;
    border: none;
    color: #fff;
    margin: 0 5px;
    padding: 4px ${selectorTileElementHeight};
    border-radius: 5px;
    box-shadow: 2px 3px 2px rgba(0, 0, 0, 0.5);
    cursor: pointer;
    justify-content: center;
    align-items: center;
    padding: 10px 0;

    & > img {
      max-height: 15px;
      max-width: 15px;
    }
  }

  & > button:nth-child(1) {
    background: #228b22;
  }

  & > button:disabled:nth-child(1) {
    background: #bab2b2;
    cursor: not-allowed;
  }

  & > button:nth-child(2) {
    background: #c41f1f;
  }
`;
