"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DomainEventSubscriber {
    constructor() {
        this._events = new Map();
    }
    static instance() {
        if (null === DomainEventSubscriber._instance) {
            DomainEventSubscriber._instance = new this();
        }
        return DomainEventSubscriber._instance;
    }
    clear() {
        this._events.clear();
    }
    events() {
        return Array.from(this._events.values());
    }
    handle(event) {
        this._events.set(event.id, event);
    }
    isSubscribedTo(_) {
        return true;
    }
}
DomainEventSubscriber._instance = null;
exports.DomainEventSubscriber = DomainEventSubscriber;
//# sourceMappingURL=domain-event-subscriber.js.map