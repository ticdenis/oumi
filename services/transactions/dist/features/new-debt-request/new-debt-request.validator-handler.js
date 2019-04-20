"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const t = tslib_1.__importStar(require("io-ts"));
const date_1 = require("io-ts-types/lib/Date/date");
const util_1 = require("../../util");
const type = t.intersection([
    t.type({
        amount: t.number,
        concept: t.string,
        currency: t.string,
        debtorId: t.string,
        id: t.string,
        loanerId: t.string,
    }),
    t.partial({
        initialDate: date_1.date,
        limitDate: date_1.date,
    }),
]);
exports.newDebtRequestValidator = data => type.decode(data);
exports.newDebtRequestValidatorHandler = util_1.simpleBodyValidatorHandler(exports.newDebtRequestValidator);
//# sourceMappingURL=new-debt-request.validator-handler.js.map