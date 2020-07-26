import React from "react";
import FooterContainer from "./Footer.style";
import FooterButton from "./FooterButton/FooterButton";
import {
  legalText,
  privacyText,
  dataSourcesText
} from "../../../resources/FooterTexts/FooterTexts";

const footer = () => (
  <FooterContainer>
    <FooterButton buttonText="Legal" dialogText={legalText} />
    <FooterButton buttonText="Data sources" dialogText={dataSourcesText} />
    <FooterButton buttonText="Privacy" dialogText={privacyText} />
  </FooterContainer>
);

export default footer;
