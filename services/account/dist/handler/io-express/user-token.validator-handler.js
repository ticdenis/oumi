"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const io_1 = require("../../validator/io");
const util_1 = require("./util");
exports.userTokenValidatorHandler = util_1.simpleBodyValidatorHandler(io_1.userTokenValidator);
//# sourceMappingURL=user-token.validator-handler.js.map