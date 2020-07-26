export const mockOriginalFunctionality = name => {
  const actualModule = require.requireActual(name);

  return {
    ...Object.getOwnPropertyNames(actualModule)
      .map(functionName => {
        return {
          [functionName]: jest.fn().mockImplementation((...args) => {
            return actualModule[functionName](...args);
          })
        };
      })
      .reduce((accumulator, currentValue) => {
        return { ...accumulator, ...currentValue };
      })
  };
};
