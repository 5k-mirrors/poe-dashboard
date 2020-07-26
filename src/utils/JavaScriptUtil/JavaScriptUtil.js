export const isDefined = value => {
  if (typeof value === "undefined") {
    return false;
  }

  return true;
};
