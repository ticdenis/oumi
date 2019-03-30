"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const typeorm_2 = require("../../entity/typeorm");
exports.loadReadDatabase = (env) => {
    let db = null;
    return {
        connect: async () => {
            if (!db) {
                db = await typeorm_1.createConnection({
                    database: env.READ_DATABASE_DATABASE,
                    entities: [typeorm_2.DomainEventEntity],
                    host: env.READ_DATABASE_HOST,
                    logging: false,
                    name: 'READ',
                    password: env.READ_DATABASE_PASSWORD,
                    port: env.READ_DATABASE_PORT,
                    synchronize: env.READ_DATABASE_SYNCHRONIZE === 'true',
                    type: env.READ_DATABASE_CONNECTION,
                    username: env.READ_DATABASE_USERNAME,
                });
            }
            return db;
        },
        connection: () => db,
        disconnect: () => (db ? db.close() : Promise.resolve()),
        isConnected: () => Promise.resolve(db ? db.isConnected : false),
    };
};
exports.loadWriteDatabase = (env) => {
    let db = null;
    return {
        connect: async () => {
            if (!db) {
                db = await typeorm_1.createConnection({
                    database: env.WRITE_DATABASE_DATABASE,
                    entities: [typeorm_2.UserEntity],
                    host: env.WRITE_DATABASE_HOST,
                    logging: false,
                    name: 'WRITE',
                    password: env.WRITE_DATABASE_PASSWORD,
                    port: env.WRITE_DATABASE_PORT,
                    synchronize: env.WRITE_DATABASE_SYNCHRONIZE === 'true',
                    type: env.WRITE_DATABASE_CONNECTION,
                    username: env.WRITE_DATABASE_USERNAME,
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