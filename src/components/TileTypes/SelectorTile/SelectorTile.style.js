import styled from "styled-components";

export const Title = styled.p`
  text-align: center;
  color: #fff;
  font-weight: bold;
`;

export const GridDiv = styled.div`
  box-sizing: border-box;
  height: 100%;
  display: grid;
  overflow: hidden;
  grid-template-rows: 20% 40% 40%;
  align-items: center;

  @media (min-width: 997px) {
    padding: 10px;
  }

  @media (max-width: 580px) {
    padding: 10px;
  }
`;

export const ItemsSelectorDiv = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: 50% 50%;
  align-items: center;
`;
