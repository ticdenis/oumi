"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require("./");
const domain_query_bus_1 = require("./domain-query-bus");
class DomainBus {
    constructor() {
        this._handlers = new Map();
    }
    static instance() {
        if (null === DomainBus._instance) {
            DomainBus._instance = new this();
        }
        return DomainBus._instance;
    }
    addHandler(commandOrQueryName, handler) {
        this._handlers.set(commandOrQueryName, handler);
    }
    async run(commandOrQuery) {
        if (commandOrQuery instanceof _1.Command) {
            const bus = _1.DomainCommandBus.instance();
            bus.addHandler(commandOrQuery.name, this._handlers.get(commandOrQuery.name));
            return bus.dispatch(commandOrQuery);
        }
        if (commandOrQuery instanceof _1.Query) {
            const bus = domain_query_bus_1.DomainQueryBus.instance();
            bus.addHandler(commandOrQuery.name, this._handlers.get(commandOrQuery.name));
            return bus.ask(commandOrQuery);
        }
    }
}
DomainBus._instance = null;
exports.DomainBus = DomainBus;
//# sourceMappingURL=domain-bus.js.map