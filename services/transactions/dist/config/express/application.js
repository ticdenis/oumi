"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = require("@oumi-package/shared/lib/core");
const terminus_1 = require("@godaddy/terminus");
const express_1 = tslib_1.__importDefault(require("express"));
const http_1 = tslib_1.__importDefault(require("http"));
const __1 = require("..");
const buses_1 = require("./buses");
const middlewares_1 = require("./middlewares");
const repositories_1 = require("./repositories");
const routes_1 = require("./routes");
exports.loadApplication = (container) => {
    container.set(__1.SERVICE_ID.USER_ID, core_1.nullableStringVO(null));
    repositories_1.loadRepositories(container);
    buses_1.loadBuses(container);
    const app = express_1.default();
    middlewares_1.loadBeforeMiddlewares(app, container);
    routes_1.loadRoutes(app, container);
    middlewares_1.loadAfterMiddlewares(app, container);
    const logger = container.get(__1.SERVICE_ID.LOGGER);
    const db = container.get(__1.SERVICE_ID.DB);
    const server = terminus_1.createTerminus(http_1.default.createServer(app), {
        logger: (msg, err) => logger.log(`Terminus: [msg] ${msg} [err] ${err}`),
        onSignal: () => Promise.all([() => db.disconnect()]),
    });
    return {
        listen: server.listen.bind(server),
    };
};
//# sourceMappingURL=application.js.map