import { unregister } from "./registerServiceWorker";

describe("registerServiceWorker", () => {
  const unregisterSW = jest.fn();

  describe("unregister function", () => {
    describe("when navigator does not contain serviceWorker", () => {
      beforeEach(() => {
        global.navigator = {};
      });

      it("does not call unregister", () => {
        unregister();

        expect(unregisterSW).not.toHaveBeenCalled();
      });
    });

    describe("when navigator contains serviceWorker", () => {
      beforeEach(() => {
        global.navigator.serviceWorker = {
          ready: new Promise(resolve => resolve({ unregister: unregisterSW() }))
        };
      });

      it("calls unregister", () => {
        unregister();

        expect(unregisterSW).toHaveBeenCalled();
      });
    });
  });
});
