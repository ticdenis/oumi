"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const dotenv_1 = tslib_1.__importDefault(require("dotenv"));
const R = tslib_1.__importStar(require("ramda"));
exports.loadEnvironment = () => {
    const raw = R.merge((() => {
        try {
            const output = dotenv_1.default.config();
            return output.error ? {} : output.parsed;
        }
        catch (err) {
            return {};
        }
    })(), process.env);
    return raw;
};
//# sourceMappingURL=environment.js.map