"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@oumi-package/core");
const domain_1 = require("../../domain");
exports.userTokenHandler = service => async (query) => core_1.eitherToPromise(await service({
    email: domain_1.userEmailVO(query.data.email),
    password: core_1.stringVO(query.data.password),
}));
//# sourceMappingURL=user-token.handler.js.map