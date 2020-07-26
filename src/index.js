import React from "react";
import ReactDOM from "react-dom";
import { configureUrlQuery } from "react-url-query";
import history from "./utils/ReactUrlQuery/history/history";
import { InitializeGA } from "./utils/InitizializeGA/InitializeGA";
import Root from "./components/Root/Root";

import registerServiceWorker from "./registerServiceWorker";

export const index = () => {
  configureUrlQuery({ history });
  InitializeGA();

  ReactDOM.render(<Root />, document.getElementById("container"));
  registerServiceWorker();
};

index();
