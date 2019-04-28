// https://jestjs.io/docs/en/configuration.html
module.exports = {
  coverageDirectory: "coverage",
  coveragePathIgnorePatterns: [
    "/src/config/",
    "/dist/",
    "/node_modules/",
    "/tools/",
  ],
  moduleFileExtensions: [
    "js",
    "json",
    "jsx",
    "ts",
    "tsx",
    "node"
  ],
  preset: 'ts-jest',
  testEnvironment: "node",
  testPathIgnorePatterns: ["/dist/", "/node_modules/", "/tools/",
    "/test/helpers/"
  ],
  testRegex: './test/.*.test.ts$',
};
