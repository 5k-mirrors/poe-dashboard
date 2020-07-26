import styled from "styled-components";

export const WeeklyChangeDiv = styled.div`
  & > p {
    right: 5px;
    bottom: 5px;
    transition: all 0.3s linear;
    visibility: hidden;
    opacity: 0;
    font-size: 12px;
    position: absolute;
  }

  &:hover {
    & > p {
      opacity: 1;
      z-index: 2;
      background: rgba(0, 0, 0, 0.8);
      margin: 0px;
      padding: 5px;
      border-radius: 3px;
      visibility: visible;
    }
  }
`;
