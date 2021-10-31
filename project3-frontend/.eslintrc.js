module.exports = {
  settings: {
    react: {
      version: "detect",
    },
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "prettier",
    "plugin:prettier/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:cypress/recommended",
    "plugin:jest/recommended",
  ],
  env: {
    browser: true,
    es2021: true,
    amd: true,
    node: true,
    "jest/globals": true,
    jest: true,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "react", "prettier", "react", "jsx-a11y", "import", "jest"],
  rules: {
    "no-console": "warn",
    "import/first": "warn",
    "react/prop-types": 0,
    "linebreak-style": 0,
    "arrow-body-style": "off",
    "prefer-arrow-callback": "off",
    "no-unused-vars": "off",
    camelcase: "warn",
    "no-tabs": "error",
    "no-var": "error",
    "@typescript-eslint/no-unused-vars": ["warn"],
    "no-empty-function": "off",
    "@typescript-eslint/no-empty-function": "off",
    "explicit-module-boundary-types": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
  },
  globals: {
    React: true,
    google: true,
    mount: true,
    mountWithRouter: true,
    shallow: true,
    shallowWithRouter: true,
    context: true,
    expect: true,
    jsdom: true,
    JSX: true,
  },
};
