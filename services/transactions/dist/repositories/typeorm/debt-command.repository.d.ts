import { Debt, DebtCommandRepository } from '@oumi-package/debt/lib/domain';
import { Oumi } from '@oumi-package/shared/lib/core';
export declare class TypeORMDebtCommandRepository implements DebtCommandRepository {
    private readonly _connection;
    constructor(container: Oumi.Container);
    confirmDebtRequest(debt: Debt): Promise<void>;
    create(debt: Debt): Promise<void>;
    denyDebtRequest(debt: Debt): Promise<void>;
}
//# sourceMappingURL=debt-command.repository.d.ts.map