"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const R = tslib_1.__importStar(require("ramda"));
const _1 = require(".");
exports.request = () => R.merge(_1.message(), {
    type: _1.stringVO('request').value,
});
//# sourceMappingURL=request.js.map