"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = require("@oumi-package/shared/lib/core");
const HttpStatus = tslib_1.__importStar(require("http-status-codes"));
const config_1 = require("../../config");
exports.healthzGetController = container => async (_, res) => {
    const db = container.get(config_1.SERVICE_ID.DB);
    if (!(await db.isConnected())) {
        res.status(HttpStatus.SERVICE_UNAVAILABLE).json(core_1.koResponse([
            {
                code: 'DATABASE_NOT_AVAILABLE',
                message: 'Database not available',
            },
        ]));
        return;
    }
    res
        .status(HttpStatus.OK)
        .json(core_1.okResponse(HttpStatus.getStatusText(HttpStatus.OK)));
};
//# sourceMappingURL=healthz.get-controller.js.map