"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@oumi-package/shared/lib/core");
const __1 = require("..");
const new_debt_request_1 = require("../../features/new-debt-request");
function loadBuses(container) {
    container.setAsync(__1.SERVICE_ID.EVENT_SUBSCRIBER, () => {
        return core_1.DomainEventSubscriber.instance();
    });
    container.setAsync(__1.SERVICE_ID.EVENT_PUBLISHER, () => {
        const publisher = core_1.DomainEventPublisher.instance();
        publisher.subscribe(container.get(__1.SERVICE_ID.EVENT_SUBSCRIBER));
        return publisher;
    });
    container.setAsync(__1.SERVICE_ID.BUS.SYNC_QUERY, () => {
        const bus = core_1.DomainQueryBus.instance();
        return bus;
    });
    container.setAsync(__1.SERVICE_ID.BUS.SYNC_COMMAND, () => {
        const bus = core_1.DomainCommandBus.instance();
        bus.addHandler(new_debt_request_1.NEW_DEBT_REQUEST_COMMAND, new_debt_request_1.NEW_DEBT_REQUEST_COMMAND_HANDLER(container));
        return bus;
    });
}
exports.loadBuses = loadBuses;
//# sourceMappingURL=buses.js.map