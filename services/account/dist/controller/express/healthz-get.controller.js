"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const lib_1 = require("@oumi-package/core/lib");
const HttpStatus = tslib_1.__importStar(require("http-status-codes"));
const config_1 = require("../../config");
exports.healthzGetController = container => async (_, res) => {
    const readDB = container.get(config_1.SERVICE_ID.DB.READ);
    const writeDB = container.get(config_1.SERVICE_ID.DB.WRITE);
    if (!(await readDB.isConnected()) || !(await writeDB.isConnected())) {
        res.status(HttpStatus.SERVICE_UNAVAILABLE).json(lib_1.koResponse([
            {
                code: 'DATABASE_NOT_AVAILABLE',
                message: 'Database not available',
            },
        ]));
        return;
    }
    res
        .status(HttpStatus.OK)
        .json(lib_1.okResponse(HttpStatus.getStatusText(HttpStatus.OK)));
};
//# sourceMappingURL=healthz-get.controller.js.map