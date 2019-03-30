"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const lib_1 = require("@oumi-package/core/lib");
const HttpStatus = tslib_1.__importStar(require("http-status-codes"));
const config_1 = require("../../config");
exports.errorHandler = container => async (err, req, res, next) => {
    container.get(config_1.SERVICE_ID.LOGGER).log(err);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(lib_1.koResponse([err]));
};
//# sourceMappingURL=error.handler.js.map