import baseUrl from "./BaseUrl";

const urlBuilder = (itemType, league) => {
  if (["Currency", "Fragment"].includes(itemType)) {
    return `${baseUrl()}currencyoverview?league=${league}&type=${itemType}`;
  }
  return `${baseUrl()}itemoverview?league=${league}&type=${itemType}`;
};

export default urlBuilder;
