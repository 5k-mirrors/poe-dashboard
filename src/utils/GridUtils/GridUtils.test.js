import * as GridUtils from "./GridUtils";

describe("GridUtils", () => {
  describe("GetLeaguesUpdateRemainingTime", () => {
    it("returns the remaining time based on the difference between `currentTime` and `lastLeaguesUpdateTime`", () => {
      const fiveMinsInMs = 5 * 60000;
      const currentTime = new Date().getTime();
      localStorage.__STORE__.lastLeaguesUpdateTime = currentTime - fiveMinsInMs;

      const actualRemainingTime = GridUtils.GetLeaguesUpdateRemainingTime();

      const expectedRemainingTime =
        fiveMinsInMs -
        (currentTime - localStorage.__STORE__.lastLeaguesUpdateTime);

      expect(actualRemainingTime).toEqual(expectedRemainingTime);
    });
  });
});
