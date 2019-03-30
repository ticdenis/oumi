"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const lib_1 = require("@oumi-package/user/lib");
const moment_1 = tslib_1.__importDefault(require("moment"));
const __1 = require("..");
const typeorm_1 = require("../../repository/typeorm");
function loadRepositories(container) {
    const env = container.get(__1.SERVICE_ID.ENV);
    container.set(__1.SERVICE_ID.TOKEN_FACTORY, lib_1.simpleJWTFactory({
        expiration: moment_1.default()
            .add(parseInt(env.TOKEN_EXPIRATION_DAYS, 10), 'days')
            .unix(),
        issuer: env.TOKEN_ISSUER,
        secret: env.TOKEN_SECRET,
    }));
    container.set(__1.SERVICE_ID.TOKEN_READER, lib_1.simpleJWTReader(env.TOKEN_SECRET));
    container.set(__1.SERVICE_ID.COMMAND_REPOSITORY.USER, new typeorm_1.TypeORMUserCommandRepository(container));
    container.set(__1.SERVICE_ID.QUERY_REPOSITORY.USER, new typeorm_1.TypeORMUserQueryRepository(container));
}
exports.loadRepositories = loadRepositories;
//# sourceMappingURL=repositories.js.map