"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require("./");
class DomainQueryBus {
    constructor() {
        this._queryHandlers = new Map();
    }
    static instance() {
        if (null === DomainQueryBus._instance) {
            DomainQueryBus._instance = new this();
        }
        return DomainQueryBus._instance;
    }
    addHandler(queryName, queryHandler) {
        this._queryHandlers.set(queryName, queryHandler);
    }
    async ask(query) {
        if ('query' !== query.type) {
            return Promise.reject(new _1.QueryDomainError('INVALID_QUERY_TYPE', `Argument received not is a query is a <${query.type}>.`));
        }
        if (!this._queryHandlers.has(query.name)) {
            return Promise.reject(new _1.QueryDomainError('QUERY_NOT_FOUND', `Query Handler for <${query.name}> not found.`));
        }
        return this._queryHandlers.get(query.name)(query);
    }
}
DomainQueryBus._instance = null;
exports.DomainQueryBus = DomainQueryBus;
//# sourceMappingURL=domain-query-bus.js.map