import { css } from "styled-components";

export const ActionButtonsContainer = css`
  & > button {
    border: none;
    background: none;
    cursor: pointer;

    & > img {
      width: 1em;
      height: 1em;
    }

    @media (max-width: 1467px) {
      & > img {
        width: 0.9em;
        height: 0.9em;
      }
    }
  }
`;
