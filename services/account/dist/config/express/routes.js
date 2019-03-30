"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("../../controller/express");
const express_2 = require("../../handler/express");
const io_express_1 = require("../../handler/io-express");
function loadRoutes(app, container) {
    app.get('/', express_1.rootGetController(container));
    app.get('/healthz', express_1.healthzGetController(container));
    app.post('/users', io_express_1.userRegistrationValidatorHandler(container), express_1.userRegistrationPostController(container));
    app.post('/auth', io_express_1.userTokenValidatorHandler(container), express_1.userTokenPostController(container));
    app.get('/profile', express_2.jwtMiddleware(container), express_1.profileGetController(container));
    app.put('/profile', express_2.jwtMiddleware(container), io_express_1.updateProfileValidatorHandler(container), express_1.updateProfilePutController(container));
}
exports.loadRoutes = loadRoutes;
//# sourceMappingURL=routes.js.map