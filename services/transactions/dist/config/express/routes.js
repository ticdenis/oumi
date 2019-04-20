"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const healthz_1 = require("../../features/healthz");
const new_debt_request_1 = require("../../features/new-debt-request");
const root_1 = require("../../features/root");
function loadRoutes(app, container) {
    app.get('/', root_1.rootRouter(container));
    app.get('/healthz', healthz_1.healthzRouter(container));
    app.post('/debts/requests', new_debt_request_1.newDebtRequestRouter(container));
}
exports.loadRoutes = loadRoutes;
//# sourceMappingURL=routes.js.map