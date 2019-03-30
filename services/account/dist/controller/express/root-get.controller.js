"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const lib_1 = require("@oumi-package/core/lib");
const HttpStatus = tslib_1.__importStar(require("http-status-codes"));
exports.rootGetController = container => async (_, res) => {
    res.status(HttpStatus.OK).json(lib_1.okResponse('Account service'));
};
//# sourceMappingURL=root-get.controller.js.map