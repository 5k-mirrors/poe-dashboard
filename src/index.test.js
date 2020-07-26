import React from "react";
import ReactDOM from "react-dom";
import { configureUrlQuery } from "react-url-query";
import Root from "./components/Root/Root";
import { index } from "./index";
import registerServiceWorker from "./registerServiceWorker";
import { InitializeGA } from "./utils/InitizializeGA/InitializeGA";

jest.mock("react-dom", () => ({ render: jest.fn() }));
jest.mock("react-url-query");
jest.mock("./registerServiceWorker");
jest.mock("./components/Root/Root.js", () => <p>App</p>);
jest.mock("./utils/InitizializeGA/InitializeGA");

describe("index", () => {
  it("calls registerServiceWorker", () => {
    index();
    expect(registerServiceWorker).toHaveBeenCalled();
  });

  it("calls InitializeGA", () => {
    index();
    expect(InitializeGA).toHaveBeenCalled();
  });

  it("calls configureUrlQuery", () => {
    index();
    expect(configureUrlQuery).toHaveBeenCalled();
  });

  it("calls ReactDOM's render function", () => {
    index();
    const container = global.document.getElementById("container");
    expect(ReactDOM.render).toHaveBeenCalledWith(<Root />, container);
  });
});
