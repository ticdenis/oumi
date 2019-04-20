import {
  Debt,
  DebtorId,
  DebtQueryRepository,
  LoanerId,
} from '@oumi-package/debt/lib/domain';
import { Oumi } from '@oumi-package/shared/lib/core';
import { DebtId } from '@oumi-package/shared/lib/domain/debt.props';

import { TaskEither } from 'fp-ts/lib/TaskEither';
import { Connection } from 'typeorm';

import { SERVICE_ID } from '../../config';

export class TypeORMDebtQueryRepository implements DebtQueryRepository {
  private readonly _connection: Connection;

  public constructor(container: Oumi.Container) {
    this._connection = container
      .get<Oumi.Database>(SERVICE_ID.DB)
      .connection<Connection>();
  }

  public debtorExists(id: DebtorId): Promise<boolean> {
    // tslint:disable-next-line: no-console
    console.log(this._connection);
    throw new Error('Method not implemented.');
  }

  public loanerExists(id: LoanerId): Promise<boolean> {
    // tslint:disable-next-line: no-console
    console.log(this._connection);
    throw new Error('Method not implemented.');
  }

  public ofId(id: DebtId): TaskEither<null, Debt> {
    // tslint:disable-next-line: no-console
    console.log(this._connection);
    throw new Error('Method not implemented.');
  }

  public pendingRequestsOfDebtorId(id: DebtorId): Promise<Debt[]> {
    // tslint:disable-next-line: no-console
    console.log(this._connection);
    throw new Error('Method not implemented.');
  }
}
