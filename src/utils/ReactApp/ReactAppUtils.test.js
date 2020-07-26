import * as ReactAppUtils from "./ReactAppUtils";

describe("ReactAppUtils", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe("setRecurringVisitor", () => {
    it("sets `recurringVisitor` to true in localStorage", () => {
      ReactAppUtils.setRecurringVisitor();

      expect(localStorage.__STORE__.recurringVisitor).toBe("true");
    });
  });

  describe("newVisitor", () => {
    it("returns true", () => {
      expect(ReactAppUtils.newVisitor()).toBe(true);
    });

    describe("when `recurringVisitor` is true in localStorage", () => {
      it("returns false", () => {
        localStorage.setItem("recurringVisitor", true);

        expect(ReactAppUtils.newVisitor()).toBe(false);
      });
    });
  });

  describe("getParsedLocalStorageItem", () => {
    describe("when key doesn't exist in localStorage", () => {
      it("returns `null`", () => {
        expect(ReactAppUtils.getParsedLocalStorageItem("bla")).toBe(null);
      });
    });

    describe("when string is present in localStorage", () => {
      it("returns string", () => {
        localStorage.__STORE__.bla = "value";

        expect(ReactAppUtils.getParsedLocalStorageItem("bla")).toBe("value");
      });
    });

    describe("when JSON string is present in localStorage", () => {
      it("returns object", () => {
        localStorage.__STORE__.bla = "{}";

        expect(ReactAppUtils.getParsedLocalStorageItem("bla")).toEqual({});
      });
    });
  });
});
