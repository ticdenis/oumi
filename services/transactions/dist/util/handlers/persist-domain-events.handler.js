"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../config");
exports.persistDomainEventsHandler = container => async (req, res, next) => {
    await container
        .get(config_1.SERVICE_ID.DOMAIN_EVENT_REPOSITORY)
        .publish(...container.get(config_1.SERVICE_ID.EVENT_SUBSCRIBER).events());
    container.get(config_1.SERVICE_ID.EVENT_SUBSCRIBER).clear();
    next();
};
//# sourceMappingURL=persist-domain-events.handler.js.map