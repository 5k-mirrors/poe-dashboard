import ReactGA from "react-ga";

export const IsProductionMode = () => {
  if (process.env.ENVIRONMENT === "production") return true;
  return false;
};

export const InitializeGA = () => {
  if (IsProductionMode()) {
    ReactGA.initialize(process.env.GA_TOKEN);
    ReactGA.pageview(window.location.pathname + window.location.search);
  }
};
