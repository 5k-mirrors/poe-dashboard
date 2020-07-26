import getProxyURL from "../../GetProxyURL/GetProxyURL";
import baseUrl from "./BaseUrl";
import LeaguesTransformer from "../../LeaguesTransformer/LeaguesTransformer";

export const fetchLeagues = async () => {
  const fetchUrl = `${baseUrl()}leagues?type=main&compact=1`;
  const apiURL = getProxyURL(fetchUrl);
  const response = await fetch(apiURL);
  return response
    .json()
    .then(res => LeaguesTransformer(res))
    .catch(() => null);
};
