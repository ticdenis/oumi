"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const entity_1 = require("./entity");
exports.loadDatabase = (env) => {
    let db = null;
    return {
        connect: async () => {
            if (!db) {
                db = await typeorm_1.createConnection({
                    database: env.DATABASE_DATABASE,
                    entities: [entity_1.DomainEventEntity],
                    host: env.DATABASE_HOST,
                    logging: true,
                    password: env.DATABASE_PASSWORD,
                    port: env.DATABASE_PORT,
                    synchronize: env.DATABASE_SYNCHRONIZE === 'true',
                    type: env.DATABASE_CONNECTION,
                    username: env.DATABASE_USERNAME,
                });
            }
            return db;
        },
        connection: () => db,
        disconnect: () => (db ? db.close() : Promise.resolve()),
        isConnected: () => Promise.resolve(db ? db.isConnected : false),
    };
};
//# sourceMappingURL=database.js.map