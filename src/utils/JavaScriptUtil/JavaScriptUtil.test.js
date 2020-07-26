import { isDefined } from "./JavaScriptUtil";

describe("JavaScriptUtil", () => {
  describe("isDefined", () => {
    describe("when the given value is undefined", () => {
      it("returns false", () => {
        const value = undefined;

        const valueIsDefined = isDefined(value);

        expect(valueIsDefined).toBeFalsy();
      });
    });

    describe("when the given value is defined", () => {
      it("returns true", () => {
        const value = 0;

        const valueIsDefined = isDefined(value);

        expect(valueIsDefined).toBeTruthy();
      });
    });
  });
});
