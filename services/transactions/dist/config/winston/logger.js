"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const winston_1 = tslib_1.__importDefault(require("winston"));
const __1 = require("..");
exports.loadLogger = (container) => {
    const isCI = !!container.get(__1.SERVICE_ID.ENV).CI;
    const logger = winston_1.default.createLogger({
        defaultMeta: { service: 'transaction' },
        format: winston_1.default.format.combine(winston_1.default.format.timestamp(), winston_1.default.format.splat(), winston_1.default.format.json()),
        silent: isCI,
        transports: isCI
            ? []
            : [
                new winston_1.default.transports.Console({
                    level: 'info',
                }),
            ],
    });
    return {
        log: logger.info.bind(logger),
    };
};
//# sourceMappingURL=logger.js.map