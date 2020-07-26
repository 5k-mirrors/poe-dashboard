import { IsProductionMode } from "./InitializeGA";

describe("InitializeGA", () => {
  describe("IsProductionMode", () => {
    describe("when the project is in development mode", () => {
      it("returns false", () => {
        process.env.ENVIRONMENT = "development";
        const returnedValue = IsProductionMode();
        expect(returnedValue).toBeFalsy();
      });
    });
    describe("when the project is in production mode", () => {
      it("returns true", () => {
        process.env.ENVIRONMENT = "production";
        const returnedValue = IsProductionMode();
        expect(returnedValue).toBeTruthy();
      });
    });
  });
});
