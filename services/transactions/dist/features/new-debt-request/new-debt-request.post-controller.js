"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const application_1 = require("@oumi-package/debt/lib/application");
const core_1 = require("@oumi-package/shared/lib/core");
const HttpStatus = tslib_1.__importStar(require("http-status-codes"));
const config_1 = require("../../config");
const util_1 = require("../../util");
exports.newDebtRequestPostController = container => (req, res, next) => container
    .get(config_1.SERVICE_ID.BUS.SYNC_COMMAND)
    .dispatch(new application_1.NewDebtRequestCommand(req.body))
    .then(() => {
    res.status(HttpStatus.CREATED).json(core_1.okResponse());
    next();
})
    .catch(util_1.defaultCatchMappingExceptions(req, res, next));
//# sourceMappingURL=new-debt-request.post-controller.js.map