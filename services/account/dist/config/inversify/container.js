"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
exports.loadContainer = () => {
    const container = new inversify_1.Container();
    return {
        get: container.get.bind(container),
        getAsync: (id) => Promise.resolve(container.get(id)),
        set: (id, value) => {
            container.bind(id).toConstantValue(value);
        },
        setAsync: (id, fn) => {
            container.bind(id).toDynamicValue(fn.bind(container));
        },
    };
};
//# sourceMappingURL=container.js.map