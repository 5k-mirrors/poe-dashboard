import styled, { keyframes } from "styled-components";

const rotateIcon = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const LeagueInfoBarDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 10px auto;
  width: 270px;
  text-align: center;
  background: rgba(40, 49, 66, 0.95);
  padding: 7px;
  border: 1px solid rgba(255, 255, 255, 0.3);

  & > button {
    outline: none;
    border: none;
    background: none;
    cursor: pointer;
  }

  & > button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const UpdateImg = styled.img`
  max-width: 45px;
  max-height: 45px;
`;

export const LoadingUpdateImg = styled.img`
  max-width: 45px;
  max-height: 45px;
  animation: ${rotateIcon} 1.5s linear infinite;
`;
