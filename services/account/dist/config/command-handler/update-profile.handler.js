"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("@oumi-package/user/lib");
const config_1 = require("../../config");
const handler = container => {
    return [
        lib_1.UpdateProfileCommand.name,
        lib_1.updateProfileHandler(lib_1.updateProfileBuilderService({
            commandRepository: container.get(config_1.SERVICE_ID.COMMAND_REPOSITORY.USER),
            eventPublisher: container.get(config_1.SERVICE_ID.EVENT_PUBLISHER),
            queryRepository: container.get(config_1.SERVICE_ID.QUERY_REPOSITORY.USER),
        })),
    ];
};
exports.default = handler;
//# sourceMappingURL=update-profile.handler.js.map