"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const t = tslib_1.__importStar(require("io-ts"));
const type = t.type({
    firstname: t.string,
    lastname: t.string,
    nickname: t.string,
    phone: t.string,
});
exports.updateProfileValidator = data => type.decode(data);
//# sourceMappingURL=update-profile.validator.js.map