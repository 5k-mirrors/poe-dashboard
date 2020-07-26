import GetTrendIcon from "./GetTrendIcon";

describe("GetTrendIcon", () => {
  describe("when direction is up", () => {
    it("renders trendIconUp", () => {
      const trendIconUp = GetTrendIcon("up");
      expect(trendIconUp.props.alt).toEqual("Trend Icon Up");
    });
  });
  describe("when direction is down", () => {
    it("renders trendIconDown", () => {
      const trendIconDown = GetTrendIcon("down");
      expect(trendIconDown.props.alt).toEqual("Trend Icon Down");
    });
  });
});
