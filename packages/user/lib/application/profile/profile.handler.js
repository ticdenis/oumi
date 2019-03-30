"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@oumi-package/core");
const domain_1 = require("../../domain");
exports.profileHandler = service => async (query) => core_1.eitherToPromise(await service({
    id: domain_1.userIdVO(query.data.id),
}));
//# sourceMappingURL=profile.handler.js.map