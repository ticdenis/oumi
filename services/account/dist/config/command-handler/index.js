"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const update_profile_handler_1 = tslib_1.__importDefault(require("./update-profile.handler"));
const user_registration_handler_1 = tslib_1.__importDefault(require("./user-registration.handler"));
exports.COMMAND_HANDLERS = container => [
    user_registration_handler_1.default(container),
    update_profile_handler_1.default(container),
];
//# sourceMappingURL=index.js.map