"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("../../util");
const _1 = require("./");
exports.newDebtRequestRouter = container => [
    util_1.jwtMiddleware(container),
    _1.newDebtRequestValidatorHandler(container),
    _1.newDebtRequestPostController(container),
];
//# sourceMappingURL=new-debt-request.router.js.map