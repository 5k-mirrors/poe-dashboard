module.exports = {
  "plugins": [
    "react",
    "prettier"
  ],
  "parser": "babel-eslint",
  "extends": [
    "airbnb",
    "plugin:prettier/recommended"
  ],
  "env": {
    "node": true,
    "jest": true,
    "browser": true
  },
  "settings": {
    "import/resolver": {
      "babel-module": {}
    }
  },
  "rules": {
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }], // Valid file extensions, or we can work only in .jsx file
    "react/prop-types": 0, // Not using prop-types yet - have to think about it
    "import/no-extraneous-dependencies": ["error", {"devDependencies": true}],
    "linebreak-style": ["error", (process.platform === "win32" ? "windows" : "unix")], // https://stackoverflow.com/q/39114446/2771889,
    "no-underscore-dangle": ["error", { "allow": ["__STORE__"] }],
    "react/jsx-one-expression-per-line": 0, // breaks on windows, fix incoming: https://github.com/yannickcr/eslint-plugin-react/pull/1894
    "import/prefer-default-export": 0, // https://stackoverflow.com/q/54245654/2771889
    "react/sort-comp": "warn", // https://github.com/yannickcr/eslint-plugin-react/issues/1214
    "prettier/prettier": "error",
/*  The following rules are unnecessary or might conflict with Prettier
    https://github.com/prettier/eslint-config-prettier#cli-helper-tool */
    "react/jsx-closing-bracket-location": "off",
    "react/jsx-closing-tag-location": "off",
    "react/jsx-curly-spacing": "off",
    "react/jsx-equals-spacing": "off",
    "react/jsx-first-prop-new-line": "off",
    "react/jsx-indent": "off",
    "react/jsx-indent-props": "off",
    "react/jsx-max-props-per-line": "off",
    "react/jsx-props-no-multi-spaces": "off",
    "react/jsx-tag-spacing": "off",
    "react/jsx-wrap-multilines": "off",
    "no-console": "off"
  }
};
