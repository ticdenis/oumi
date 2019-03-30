"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("@oumi-package/user/lib");
const __1 = require("..");
const handler = container => {
    return [
        lib_1.UserTokenQuery.name,
        lib_1.userTokenHandler(lib_1.userTokenBuilderService({
            queryRepository: container.get(__1.SERVICE_ID.QUERY_REPOSITORY.USER),
            tokenFactory: container.get(__1.SERVICE_ID.TOKEN_FACTORY),
        })),
    ];
};
exports.default = handler;
//# sourceMappingURL=user-token.handler.js.map