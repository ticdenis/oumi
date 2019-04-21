"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require("./");
exports.message = () => ({
    id: _1.uuidVO().value,
    type: _1.stringVO('message').value,
});
//# sourceMappingURL=message.js.map