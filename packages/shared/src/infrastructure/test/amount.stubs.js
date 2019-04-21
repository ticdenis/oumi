"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const amount_props_1 = require("../../domain/amount.props");
const currency_stubs_1 = require("./currency.stubs");
exports.DEFAULT_AMOUNT_STUB = 100.0;
exports.EuroAmountStub = amount_props_1.amountVO({
    amount: exports.DEFAULT_AMOUNT_STUB,
    currency: currency_stubs_1.EuroCurrencyStub,
});
exports.DolarAmountStub = amount_props_1.amountVO({
    amount: exports.DEFAULT_AMOUNT_STUB,
    currency: currency_stubs_1.DolarCurrencyStub,
});
//# sourceMappingURL=amount.stubs.js.map