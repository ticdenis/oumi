"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const t = tslib_1.__importStar(require("io-ts"));
const type = t.type({
    email: t.string,
    password: t.string,
});
exports.userTokenValidator = data => type.decode(data);
//# sourceMappingURL=user-token.validator.js.map