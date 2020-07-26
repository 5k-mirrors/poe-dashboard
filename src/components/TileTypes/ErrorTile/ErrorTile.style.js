import styled from "styled-components";

export const ErrorDiv = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 100%;
`;

export const ErrorContentDiv = styled.div`
  padding: 30px;
  background: #283142;
  border-radius: 10px;
`;

export const DeleteButton = styled.button`
  border: none;
  background: none;
  position: absolute;
  cursor: pointer;
  right: 35px;
  top: 15px;
`;
