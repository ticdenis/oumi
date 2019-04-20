"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = require("@oumi-package/shared/lib/core");
const HttpStatus = tslib_1.__importStar(require("http-status-codes"));
exports.defaultCatchMappingExceptions = (_, res, next) => (err) => {
    if (!(err instanceof core_1.DomainError)) {
        next(err);
    }
    else if (err instanceof core_1.ValueObjectDomainError) {
        res.status(HttpStatus.BAD_REQUEST).json(core_1.koResponse([err]));
    }
    else {
        if (err.code.indexOf('NOT_FOUND') !== -1 ||
            err.code.indexOf('NOT_EXIST') !== -1) {
            res.status(HttpStatus.NOT_FOUND).json(core_1.koResponse([err]));
        }
        else {
            res.status(HttpStatus.CONFLICT).json(core_1.koResponse([err]));
        }
    }
};
const validatorHandler = requestProp => validator => () => (req, res, next) => {
    const validation = validator(req[requestProp]);
    if (validation.isLeft()) {
        res
            .status(HttpStatus.BAD_REQUEST)
            .json(core_1.koResponse(core_1.validationReporter(validation.value)));
        return;
    }
    next();
};
exports.simpleBodyValidatorHandler = validatorHandler('body');
exports.simpleParamsValidatorHandler = validatorHandler('params');
//# sourceMappingURL=io-express.js.map