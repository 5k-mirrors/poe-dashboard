import styled, { keyframes } from "styled-components";

const LoadEffect = keyframes`
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
`;

export const ItemDiv = styled.div`
  height: 100%;
  display: grid;
  grid-template-rows: repeat(3, auto);
  grid-template-columns: 1fr 3fr;
  animation: ${LoadEffect} 0.6s linear;
  overflow: hidden;

  & > img {
    grid-column: 1 / span 1;
    grid-row: 1 / 4;
    margin: 0 auto;
    max-height: 100%;
    max-width: 47px;
    align-self: center;
  }

  @media (max-width: 580px) {
    grid-template-columns: 1fr;

    & > img {
      display: none;
    }
  }
`;

export const HeaderDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  font-size: 18px;

  & > p {
    font-weight: bold;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    width: 70%;

    & > span {
      font-weight: normal;
      font-style: italic;
    }
  }

  @media (max-width: 1467px) {
    & > p {
      font-size: 0.8em;
    }
  }

  @media (max-width: 580px) {
    & > p {
      font-size: 0.7em;
    }
  }
`;

export const InfoDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(4, auto);

  @media (max-width: 1467px) {
    & > div {
      font-size: 13px;
    }
  }

  @media (max-width: 580px) {
    text-align: center;
  }
`;
