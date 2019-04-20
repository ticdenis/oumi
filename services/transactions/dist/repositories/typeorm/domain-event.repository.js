"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../config");
const entity_1 = require("../../config/typeorm/entity");
class TypeORMDomainEventRepository {
    constructor(container) {
        this._connection = container
            .get(config_1.SERVICE_ID.DB)
            .connection();
    }
    async publish(...events) {
        const entityManager = this._connection.createEntityManager();
        await Promise.all(events.map(event => entityManager.insert(entity_1.DomainEventEntity, {
            data: JSON.stringify(event.data),
            id: event.id,
            occurredOn: event.occurredOn,
            type: event.type,
        })));
    }
}
exports.TypeORMDomainEventRepository = TypeORMDomainEventRepository;
//# sourceMappingURL=domain-event.repository.js.map