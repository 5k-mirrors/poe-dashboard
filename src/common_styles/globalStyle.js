import { createGlobalStyle } from "styled-components";
import mainBg from "mainBg";

const GlobalStyle = createGlobalStyle`
  body {
    background-image: url(${mainBg});
    background-attachment: fixed;
    background-position: top;
    color: white;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
  }
`;

export default GlobalStyle;
