"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const t = tslib_1.__importStar(require("io-ts"));
const type = t.type({
    id: t.string,
});
exports.profileValidator = data => type.decode(data);
//# sourceMappingURL=profile.validator.js.map