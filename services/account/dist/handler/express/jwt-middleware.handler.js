"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const lib_1 = require("@oumi-package/core/lib");
const HttpStatus = tslib_1.__importStar(require("http-status-codes"));
const config_1 = require("../../config");
exports.jwtMiddleware = container => async (req, res, next) => {
    const tokenReader = container.get(config_1.SERVICE_ID.TOKEN_READER);
    await tokenReader
        .read(req.headers.authorization)
        .fold(err => {
        res.status(HttpStatus.UNAUTHORIZED).json(lib_1.koResponse([err]));
    }, userId => {
        container.set(config_1.SERVICE_ID.USER_ID, userId);
        next();
    })
        .run();
};
//# sourceMappingURL=jwt-middleware.handler.js.map