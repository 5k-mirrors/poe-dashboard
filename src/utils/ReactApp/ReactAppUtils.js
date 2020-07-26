export const setRecurringVisitor = () => {
  localStorage.setItem("recurringVisitor", true);
};

export const newVisitor = () => {
  return !(localStorage.getItem("recurringVisitor") === "true");
};

export const getParsedLocalStorageItem = key => {
  let localStorageItem = localStorage.getItem(key);

  try {
    localStorageItem = JSON.parse(localStorageItem);
  } catch (error) {
    if (!(error instanceof SyntaxError)) {
      throw error;
    }
  }

  return localStorageItem;
};
