import { Debt, DebtorId, DebtQueryRepository, LoanerId } from '@oumi-package/debt/lib/domain';
import { Oumi } from '@oumi-package/shared/lib/core';
import { DebtId } from '@oumi-package/shared/lib/domain/debt.props';
import { TaskEither } from 'fp-ts/lib/TaskEither';
export declare class TypeORMDebtQueryRepository implements DebtQueryRepository {
    private readonly _connection;
    constructor(container: Oumi.Container);
    debtorExists(id: DebtorId): Promise<boolean>;
    loanerExists(id: LoanerId): Promise<boolean>;
    ofId(id: DebtId): TaskEither<null, Debt>;
    pendingRequestsOfDebtorId(id: DebtorId): Promise<Debt[]>;
}
//# sourceMappingURL=debt-query.repository.d.ts.map