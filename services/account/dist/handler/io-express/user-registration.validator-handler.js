"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const io_1 = require("../../validator/io");
const util_1 = require("./util");
exports.userRegistrationValidatorHandler = util_1.simpleBodyValidatorHandler(io_1.userRegistrationValidator);
//# sourceMappingURL=user-registration.validator-handler.js.map