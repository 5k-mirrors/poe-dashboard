import trendIconDown from "trendIconDown";
import trendIconUp from "trendIconUp";
import ImageDisplayer from "../ImageDisplayer";

const getTrendIcon = direction => {
  const trendIconDisplayer =
    direction === "up"
      ? ImageDisplayer(trendIconUp, "Trend Icon Up")
      : ImageDisplayer(trendIconDown, "Trend Icon Down");

  return trendIconDisplayer;
};

export default getTrendIcon;
