"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const helmet_1 = tslib_1.__importDefault(require("helmet"));
const morgan_1 = tslib_1.__importDefault(require("morgan"));
const util_1 = require("../../util");
function loadBeforeMiddlewares(app, container) {
    app.use(helmet_1.default());
    app.use(morgan_1.default('combined'));
    app.use(express_1.default.json());
}
exports.loadBeforeMiddlewares = loadBeforeMiddlewares;
function loadAfterMiddlewares(app, container) {
    app.use(util_1.persistDomainEventsHandler(container));
    app.use(util_1.errorHandler(container));
}
exports.loadAfterMiddlewares = loadAfterMiddlewares;
//# sourceMappingURL=middlewares.js.map