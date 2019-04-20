"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DomainEventPublisher {
    constructor() {
        this.subscribers = new Map();
        this.id = 0;
    }
    static instance() {
        if (null === DomainEventPublisher._instance) {
            DomainEventPublisher._instance = new this();
        }
        return DomainEventPublisher._instance;
    }
    subscribe(subscriber) {
        const id = this.id;
        this.subscribers.set(id, subscriber);
        this.id += 1;
        return this.id;
    }
    ofId(id) {
        return this.subscribers.get(id) || null;
    }
    unsubscribe(id) {
        this.subscribers.delete(id);
    }
    publish(...events) {
        [...this.subscribers.values()]
            .filter(subscriber => events.filter(event => subscriber.isSubscribedTo(event)))
            .forEach(subscriber => events.forEach(event => subscriber.handle(event)));
        return Promise.resolve();
    }
}
DomainEventPublisher._instance = null;
exports.DomainEventPublisher = DomainEventPublisher;
//# sourceMappingURL=domain-event-publisher.js.map