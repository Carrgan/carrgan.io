module.exports = {
  parser: "@typescript-eslint/parser",
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "react-app",
    "prettier"
  ],
  plugins: ["@typescript-eslint", "react", "prettier"],
  rules: {
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
        arrowParens: "avoid"
      }
    ],
    "@typescript-eslint/ban-types": "off",
    "@typescript-eslint/indent": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/no-new-func": "off",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": 1,
    "@typescript-eslint/no-unused-vars": [
      "warn",
      { varsIgnorePattern: "_", argsIgnorePattern: "_" }
    ]
  },
  env: {}
};
