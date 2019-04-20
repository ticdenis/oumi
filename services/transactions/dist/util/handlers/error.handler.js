"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = require("@oumi-package/shared/lib/core");
const HttpStatus = tslib_1.__importStar(require("http-status-codes"));
const config_1 = require("../../config");
exports.errorHandler = container => (err, req, res, next) => {
    container.get(config_1.SERVICE_ID.LOGGER).log(JSON.stringify(err));
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(core_1.koResponse([err]));
};
//# sourceMappingURL=error.handler.js.map