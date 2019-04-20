"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../config");
class TypeORMDebtQueryRepository {
    constructor(container) {
        this._connection = container
            .get(config_1.SERVICE_ID.DB)
            .connection();
    }
    debtorExists(id) {
        console.log(this._connection);
        throw new Error('Method not implemented.');
    }
    loanerExists(id) {
        console.log(this._connection);
        throw new Error('Method not implemented.');
    }
    ofId(id) {
        console.log(this._connection);
        throw new Error('Method not implemented.');
    }
    pendingRequestsOfDebtorId(id) {
        console.log(this._connection);
        throw new Error('Method not implemented.');
    }
}
exports.TypeORMDebtQueryRepository = TypeORMDebtQueryRepository;
//# sourceMappingURL=debt-query.repository.js.map