"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("@oumi-package/core/lib");
const __1 = require("..");
const command_handler_1 = require("../command-handler");
const query_handler_1 = require("../query-handler");
function loadBuses(container) {
    container.setAsync(__1.SERVICE_ID.EVENT_SUBSCRIBER, () => {
        return lib_1.DomainEventSubscriber.instance();
    });
    container.setAsync(__1.SERVICE_ID.EVENT_PUBLISHER, () => {
        const publisher = lib_1.DomainEventPublisher.instance();
        publisher.subscribe(container.get(__1.SERVICE_ID.EVENT_SUBSCRIBER));
        return publisher;
    });
    container.setAsync(__1.SERVICE_ID.BUS.QUERY, () => {
        const bus = lib_1.DomainQueryBus.instance();
        query_handler_1.QUERY_HANDLERS(container).forEach(handler => bus.addHandler(...handler));
        return bus;
    });
    container.setAsync(__1.SERVICE_ID.BUS.COMMAND, () => {
        const bus = lib_1.DomainCommandBus.instance();
        command_handler_1.COMMAND_HANDLERS(container).forEach(handler => bus.addHandler(...handler));
        return bus;
    });
}
exports.loadBuses = loadBuses;
//# sourceMappingURL=buses.js.map