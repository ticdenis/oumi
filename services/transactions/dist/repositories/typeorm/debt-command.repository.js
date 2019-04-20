"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../config");
class TypeORMDebtCommandRepository {
    constructor(container) {
        this._connection = container
            .get(config_1.SERVICE_ID.DB)
            .connection();
    }
    confirmDebtRequest(debt) {
        console.log(this._connection);
        throw new Error('Method not implemented.');
    }
    create(debt) {
        console.log(this._connection);
        throw new Error('Method not implemented.');
    }
    denyDebtRequest(debt) {
        console.log(this._connection);
        throw new Error('Method not implemented.');
    }
}
exports.TypeORMDebtCommandRepository = TypeORMDebtCommandRepository;
//# sourceMappingURL=debt-command.repository.js.map