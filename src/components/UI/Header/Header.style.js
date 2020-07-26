import styled from "styled-components";
import logo from "../../../resources/assets/Logo/logo.png";

export const MainHeader = styled.div`
  width: 100%;
  height: 5em;
  background: #171d29;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const HeaderTitle = styled.div`
  display: flex;
  align-items: center;
  color: #fff;
  font-size: 2em;
  margin: 20px 15px;

  @media screen and (max-width: 600px) {
    & > p {
      display: none;
    }
  }
`;

export const LogoDiv = styled.div`
  background: url(${logo});
  min-width: 47px;
  min-height: 47px;
  margin-right: 10px;
`;

export const HeaderCenterButton = styled.button`
  background: transparent;
  border: none;
  color: white;
  cursor: pointer;
  outline: none;
  left: calc(50% - 33px);
  position: absolute;

  & > img {
    width: 60px;
    height: 60px;
  }
`;

export const HeaderRightIcons = styled.div`
  display: flex;
  float: right;
  color: #fff;
  height: 100%;
  align-items: center;
  justify-content: center;

  & > button {
    border: none;
    outline: none;
    background: none;
    cursor: pointer;
  }

  & > a {
    padding: 0px 10px;
  }

  & button > img {
    width: 60px;
    height: 60px;
  }

  @media screen and (max-width: 600px) {
    & > button:first-of-type {
      &[name="Reload"] {
        position: absolute;
        left: 20%;
      }
    }
  }
`;

export const Icon = styled.div`
  margin: 0 20px;
`;

export const ClearGridButton = styled.button`
  margin-right: 5px;
  color: white;
  border-radius: 3px;
  display: flex;
  padding-top: 3px;
  padding-bottom: 3px;
  background-color: transparent !important;
  transition: background-color 0.3s ease-in-out;

  @media screen and (max-width: 600px) {
    margin-right: 0px;
  }

  &:hover {
    background-color: #d14949 !important;
  }

  & > svg {
    width: 60px;
    height: 60px;
  }
`;

export const BetaFlag = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;

  & > h5 {
    background-color: white;
    border: 1px solid #171d29;
    color: #171d29;
    margin: 15px -17px 0px 0px;
    clip-path: polygon(18% 0%, 81% 0%, 100% 100%, 0% 101%);
    z-index: 3;
    transform: rotate(45deg);
    width: 80px;
    text-align: center;
  }

  &:hover + p {
    opacity: 1;
    z-index: 2;
    background: rgba(0, 0, 0, 0.8);
    margin: 0px;
    padding: 20px;
    border-radius: 3px;
    visibility: visible;
  }
`;

export const BetaParagraph = styled.p`
  transition: all 0.3s linear;
  visibility: hidden;
  opacity: 0;
  right: 25px;
  position: absolute;
  width: 200px;
  top: 85px;
`;
