import getProxyURL from "../../../GetProxyURL/GetProxyURL";
import urlBuilder from "../UrlBuilder";

export const fetchItems = async (itemType, league) => {
  const url = urlBuilder(itemType, league);
  const apiURL = getProxyURL(url);
  const response = await fetch(apiURL);
  return response
    .json()
    .then(res => res)
    .catch((e) => console.error(e));
};
