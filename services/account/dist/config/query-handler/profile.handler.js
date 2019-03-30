"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("@oumi-package/user/lib");
const __1 = require("..");
const handler = container => {
    return [
        lib_1.ProfileQuery.name,
        lib_1.profileHandler(lib_1.profileBuilderService({
            queryRepository: container.get(__1.SERVICE_ID.QUERY_REPOSITORY.USER),
        })),
    ];
};
exports.default = handler;
//# sourceMappingURL=profile.handler.js.map