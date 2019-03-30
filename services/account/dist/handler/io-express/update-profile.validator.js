"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const io_1 = require("../../validator/io");
const util_1 = require("./util");
exports.updateProfileValidatorHandler = util_1.simpleBodyValidatorHandler(io_1.updateProfileValidator);
//# sourceMappingURL=update-profile.validator.js.map