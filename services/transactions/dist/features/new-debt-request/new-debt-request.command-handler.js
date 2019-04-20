"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const application_1 = require("@oumi-package/debt/lib/application");
const config_1 = require("../../config");
exports.NEW_DEBT_REQUEST_COMMAND = application_1.NewDebtRequestCommand.name;
exports.NEW_DEBT_REQUEST_COMMAND_HANDLER = (container) => application_1.newDebtRequestHandler(application_1.newDebtRequestBuilderService({
    commandRepository: container.get(config_1.SERVICE_ID.COMMAND_REPOSITORY.DEBT),
    eventPublisher: container.get(config_1.SERVICE_ID.EVENT_PUBLISHER),
    queryRepository: container.get(config_1.SERVICE_ID.QUERY_REPOSITORY.DEBT),
}));
//# sourceMappingURL=new-debt-request.command-handler.js.map