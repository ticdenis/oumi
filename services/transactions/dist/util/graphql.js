"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
const persistDomainEventsJob = (container) => container
    .get(config_1.SERVICE_ID.DOMAIN_EVENT_REPOSITORY)
    .publish(...container.get(config_1.SERVICE_ID.EVENT_SUBSCRIBER).events());
const clearDomainEventsJob = (container) => container.get(config_1.SERVICE_ID.EVENT_SUBSCRIBER).clear();
exports.runDomainEventsJob = async (container) => Promise.all([
    persistDomainEventsJob(container),
    Promise.resolve(clearDomainEventsJob(container)),
]);
exports.mutationResolver = (CommandClass) => (_, { input }, { container }) => container
    .get(config_1.SERVICE_ID.BUS.SYNC_COMMAND)
    .dispatch(new CommandClass(input))
    .then(async (response) => {
    await exports.runDomainEventsJob(container);
    return response;
});
exports.queryResolver = (QueryClass) => (_, { input }, { container }) => container
    .get(config_1.SERVICE_ID.BUS.SYNC_QUERY)
    .ask(new QueryClass(input))
    .then(async (response) => {
    await exports.runDomainEventsJob(container);
    return response;
});
//# sourceMappingURL=graphql.js.map