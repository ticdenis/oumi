"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const t = tslib_1.__importStar(require("io-ts"));
const type = t.type({
    email: t.string,
    firstname: t.string,
    id: t.string,
    lastname: t.string,
    nickname: t.string,
    password: t.string,
    phone: t.string,
});
exports.userRegistrationValidator = data => type.decode(data);
//# sourceMappingURL=user-registration.validator.js.map