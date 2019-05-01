import {
  Debt,
  DebtorId,
  DebtQueryRepository,
  LoanerId,
} from '@oumi-package/movement/lib/domain';
import { Oumi } from '@oumi-package/shared/lib/core';
import { DebtId } from '@oumi-package/shared/lib/domain/debt.props';

import { TaskEither } from 'fp-ts/lib/TaskEither';
import { Connection } from 'typeorm';

import { SERVICE_ID } from '../../config';

export class TypeORMDebtQueryRepository implements DebtQueryRepository {
  /* tslint:disable:no-unused-variable */
  private readonly _connection: Connection;

  public constructor(container: Oumi.Container) {
    this._connection = container
      .get<Oumi.Database>(SERVICE_ID.DB)
      .connection<Connection>();
  }

  public allOfIds(ids: DebtId[]): TaskEither<null, Debt[]> {
    throw new Error('Method not implemented.');
  }

  public debtorExists(id: DebtorId): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  public loanerExists(id: LoanerId): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  public ofId(id: DebtId): TaskEither<null, Debt> {
    throw new Error('Method not implemented.');
  }

  public pendingRequestsOfDebtorId(id: DebtorId): Promise<Debt[]> {
    throw new Error('Method not implemented.');
  }
}
