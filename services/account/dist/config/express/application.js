"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const buses_1 = require("./buses");
const middlewares_1 = require("./middlewares");
const repositories_1 = require("./repositories");
const routes_1 = require("./routes");
exports.loadApplication = (container) => {
    repositories_1.loadRepositories(container);
    buses_1.loadBuses(container);
    const app = express_1.default();
    middlewares_1.loadBeforeMiddlewares(app, container);
    routes_1.loadRoutes(app, container);
    middlewares_1.loadAfterMiddlewares(app, container);
    return {
        listen: app.listen.bind(app),
    };
};
//# sourceMappingURL=application.js.map