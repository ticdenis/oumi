"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const lib_1 = require("@oumi-package/core/lib");
const lib_2 = require("@oumi-package/user/lib");
const HttpStatus = tslib_1.__importStar(require("http-status-codes"));
const config_1 = require("../../config");
exports.profileGetController = container => (req, res, next) => container
    .get(config_1.SERVICE_ID.BUS.QUERY)
    .ask(new lib_2.ProfileQuery({
    id: container.get(config_1.SERVICE_ID.USER_ID).value,
}))
    .then(profile => {
    res.status(HttpStatus.OK).json(lib_1.okResponse(profile));
    next();
})
    .catch(err => {
    if (!(err instanceof lib_1.DomainError)) {
        next(err);
    }
    else if (err instanceof lib_1.ValueObjectDomainError) {
        res.status(HttpStatus.BAD_REQUEST).json(lib_1.koResponse([err]));
    }
    else {
        res.status(HttpStatus.CONFLICT).json(lib_1.koResponse([err]));
    }
});
//# sourceMappingURL=profile-get.controller.js.map