"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = require("@oumi-package/shared/lib/core");
const HttpStatus = tslib_1.__importStar(require("http-status-codes"));
exports.rootGetController = () => (_, res) => {
    res.status(HttpStatus.OK).json(core_1.okResponse('Account service'));
};
//# sourceMappingURL=root.get-controller.js.map