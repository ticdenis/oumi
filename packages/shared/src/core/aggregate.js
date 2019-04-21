"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AggregateRoot {
    constructor() {
        this._domainEvents = [];
    }
    pullDomainEvents() {
        const domainEvents = [...this._domainEvents];
        this._domainEvents = [];
        return domainEvents;
    }
    recordDomainEvent(domainEvent) {
        this._domainEvents.push(domainEvent);
    }
}
exports.AggregateRoot = AggregateRoot;
class Aggregate {
}
exports.Aggregate = Aggregate;
//# sourceMappingURL=aggregate.js.map