"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
exports.SERVICE_ID = {
    BUS: {
        COMMAND: Symbol('COMMAND_BUS_SERVICE_ID'),
        QUERY: Symbol('QUERY_BUS_SERVICE_ID'),
    },
    COMMAND_REPOSITORY: {
        USER: Symbol('USER_COMMAND_REPOSITORY_SERVICE_ID'),
    },
    DB: {
        READ: Symbol('DB_READ_SERVICE_ID'),
        WRITE: Symbol('DB_WRITE_SERVICE_ID'),
    },
    ENV: Symbol('ENV_SERVICE_ID'),
    EVENT_PUBLISHER: Symbol('EVENT_PUBLISHER_SERVICE_ID'),
    EVENT_SUBSCRIBER: Symbol('EVENT_SUBSCRIBER_SERVICE_ID'),
    LOGGER: Symbol('LOGGER_SERVICE_ID'),
    QUERY_REPOSITORY: {
        USER: Symbol('USER_QUERY_REPOSITORY_SERVICE_ID'),
    },
    TOKEN_FACTORY: Symbol('TOKEN_FACTORY_SERVICE_ID'),
    TOKEN_READER: Symbol('TOKEN_READER_SERVICE_ID'),
    USER_ID: Symbol('USER_ID_SERVICE_ID'),
};
tslib_1.__exportStar(require("./express/application"), exports);
tslib_1.__exportStar(require("./inversify/container"), exports);
tslib_1.__exportStar(require("./typeorm/database"), exports);
tslib_1.__exportStar(require("./dotenv/environment"), exports);
tslib_1.__exportStar(require("./winston/logger"), exports);
//# sourceMappingURL=index.js.map