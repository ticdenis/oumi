"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const profile_handler_1 = tslib_1.__importDefault(require("./profile.handler"));
const user_token_handler_1 = tslib_1.__importDefault(require("./user-token.handler"));
exports.QUERY_HANDLERS = container => [
    profile_handler_1.default(container),
    user_token_handler_1.default(container),
];
//# sourceMappingURL=index.js.map