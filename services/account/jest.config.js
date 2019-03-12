// https://jestjs.io/docs/en/configuration.html
module.exports = {
  coverageDirectory: "coverage",
  coveragePathIgnorePatterns: [
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
  testPathIgnorePatterns: ["/dist/", "/node_modules/", "/tools/"],
  testRegex: './test/.*.ts$',
  "transform": {
    "^.+\\.tsx?$": "<rootDir>/node_modules/ts-jest"
  },

};
