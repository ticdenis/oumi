"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("../core");
exports.currencyVO = (value) => core_1.simpleValueObject({
    code: core_1.stringVO(value.code).value,
    symbol: core_1.stringVO(value.symbol).value,
});
const SYMBOLS = new Map();
SYMBOLS.set('EUR', '€');
SYMBOLS.set('USD', '$');
exports.currencyFromCodeVO = (value) => exports.currencyVO({
    code: value,
    symbol: SYMBOLS.get(value),
});
//# sourceMappingURL=currency.props.js.map