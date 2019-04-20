"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eitherToPromise = result => result.isLeft()
    ? Promise.reject(result.value)
    : Promise.resolve(result.value);
//# sourceMappingURL=either-to-promise.js.map