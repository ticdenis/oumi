export default {
  "cache": true,
  "compileEnhancements": false,
  "concurrency": 20,
  "extensions": [
    "ts"
  ],
  "failFast": true,
  "files": [
    "test/**/*.ts",
    "!test/**/*.stubs.ts"
  ],
  "require": [
    "ts-node/register"
  ]
};
