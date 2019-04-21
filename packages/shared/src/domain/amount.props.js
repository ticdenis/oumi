"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("../core");
exports.amountVO = (value) => core_1.simpleValueObject({
    amount: core_1.floatVO(value.amount).value,
    currency: value.currency.value,
});
//# sourceMappingURL=amount.props.js.map