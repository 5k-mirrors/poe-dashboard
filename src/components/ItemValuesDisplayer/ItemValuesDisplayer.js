import React from "react";
import chaosIcon from "chaosIcon";
import exaltIcon from "exaltIcon";
import ImageDisplayer from "../ImageDisplayer/ImageDisplayer";
import GetTrendIcon from "../ImageDisplayer/GetTrendIcon/GetTrendIcon";
import { WeeklyChangeDiv } from "./ItemValuesDisplayer.style";

const itemValuesDisplayer = ({ label, itemDetails }) => (
  <React.Fragment>
    <div>{label}</div>
    <div>
      {itemDetails.chaosPrice}
      {ImageDisplayer(chaosIcon, "Chaos")}
    </div>
    <div>
      {itemDetails.exaltPrice}
      {ImageDisplayer(exaltIcon, "Exalt")}
    </div>
    <WeeklyChangeDiv>
      {itemDetails.weeklyChange}
      {GetTrendIcon(itemDetails.weeklyChange > 0 ? "up" : "down")}
      <p>7 day trend</p>
    </WeeklyChangeDiv>
  </React.Fragment>
);

export default itemValuesDisplayer;
