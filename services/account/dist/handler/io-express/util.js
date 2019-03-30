"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const lib_1 = require("@oumi-package/core/lib");
const HttpStatus = tslib_1.__importStar(require("http-status-codes"));
const validatorHandler = requestProp => validator => () => (req, res, next) => {
    const validation = validator(req[requestProp]);
    if (validation.isLeft()) {
        res
            .status(HttpStatus.BAD_REQUEST)
            .json(lib_1.koResponse(lib_1.validationReporter(validation.value)));
        return;
    }
    next();
};
exports.simpleBodyValidatorHandler = validatorHandler('body');
exports.simpleParamsValidatorHandler = validatorHandler('params');
//# sourceMappingURL=util.js.map