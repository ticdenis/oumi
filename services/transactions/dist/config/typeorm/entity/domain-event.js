"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
exports.DomainEventEntity = new typeorm_1.EntitySchema({
    columns: {
        data: {
            type: String,
        },
        id: {
            generated: 'uuid',
            primary: true,
            type: String,
        },
        occurredOn: {
            createDate: true,
            type: Date,
        },
        type: {
            type: String,
        },
    },
    name: 'domain_event',
    tableName: 'domain_events',
});
//# sourceMappingURL=domain-event.js.map