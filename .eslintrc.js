/** @type {import("@types/eslint").Linter.BaseConfig} */
module.exports = {
  extends: [
    "@remix-run/eslint-config",
    "@remix-run/eslint-config/node",
    "prettier",
  ],
  env: {},
  // we're using vitest which has a very similar API to jest
  // (so the linting plugins work nicely), but it means we have to explicitly
  // set the jest version.
  settings: {
    jest: {
      version: 28,
    },
  },
  overrides: [
    {
      files: "app/**/*.spec.ts[x]",
      extends: ["@remix-run/eslint-config/jest-testing-library"],
    },
  ],
};
