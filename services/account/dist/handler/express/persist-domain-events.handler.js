"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../config");
const typeorm_1 = require("../../entity/typeorm");
exports.persistDomainEventsHandler = container => async (req, res, next) => {
    const events = container
        .get(config_1.SERVICE_ID.EVENT_SUBSCRIBER)
        .events();
    const entityManager = container
        .get(config_1.SERVICE_ID.DB.READ)
        .connection()
        .createEntityManager();
    await Promise.all(events.map(event => entityManager.insert(typeorm_1.DomainEventEntity, {
        data: JSON.stringify(event.data),
        id: event.id,
        occurredOn: event.occurredOn,
        type: event.type,
    })));
    next();
};
//# sourceMappingURL=persist-domain-events.handler.js.map