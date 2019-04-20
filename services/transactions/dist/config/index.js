"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
exports.SERVICE_ID = {
    BUS: {
        SYNC_COMMAND: Symbol.for('SYNC_COMMAND_BUS_SERVICE_ID'),
        SYNC_QUERY: Symbol.for('SYNC_QUERY_BUS_SERVICE_ID'),
    },
    COMMAND_REPOSITORY: {
        DEBT: Symbol.for('DEBT_COMMAND_REPOSITORY_SERVICE_ID'),
    },
    DB: Symbol.for('DB_SERVICE_ID'),
    DOMAIN_EVENT_REPOSITORY: Symbol.for('DOMAIN_EVENT_REPOSITORY_SERVICE_ID'),
    ENV: Symbol.for('ENV_SERVICE_ID'),
    EVENT_PUBLISHER: Symbol.for('EVENT_PUBLISHER_SERVICE_ID'),
    EVENT_SUBSCRIBER: Symbol.for('EVENT_SUBSCRIBER_SERVICE_ID'),
    LOGGER: Symbol.for('LOGGER_SERVICE_ID'),
    QUERY_REPOSITORY: {
        DEBT: Symbol.for('DEBT_QUERY_REPOSITORY_SERVICE_ID'),
    },
    TOKEN_FACTORY: Symbol.for('TOKEN_FACTORY_SERVICE_ID'),
    TOKEN_READER: Symbol.for('TOKEN_READER_SERVICE_ID'),
    USER_ID: Symbol.for('USER_ID_SERVICE_ID'),
};
tslib_1.__exportStar(require("./express/application"), exports);
tslib_1.__exportStar(require("./inversify/container"), exports);
tslib_1.__exportStar(require("./typeorm/database"), exports);
tslib_1.__exportStar(require("./dotenv/environment"), exports);
tslib_1.__exportStar(require("./winston/logger"), exports);
//# sourceMappingURL=index.js.map