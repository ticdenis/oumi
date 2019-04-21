"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const R = tslib_1.__importStar(require("ramda"));
const _1 = require("./");
exports.event = (data) => R.merge(_1.message(), {
    data,
    occurredOn: new Date(),
    type: _1.stringVO('event').value,
});
exports.publisher = (eventPublisher) => async (...events) => {
    await eventPublisher.publish(...events);
};
exports.notifier = (eventBus) => async (e) => {
    await eventBus.notify(e);
};
//# sourceMappingURL=event.js.map