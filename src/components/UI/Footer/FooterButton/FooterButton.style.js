import styled from "styled-components";

export const ButtonContainer = styled.div`
  display: inline-block;
`;

export const FooterLink = styled.button`
  font-size: 1.4em;
  color: #fff;
  margin: 19px 20px;
  height: 100%;
  background: none;
  outline: none;
  border: none;
  cursor: pointer;

  @media (max-width: 996px) {
    font-size: 1.2em;
    margin-top: 20px;
  }
`;
