import {
  Payment,
  PaymentDebt,
  PaymentDebtId,
  PaymentDebtUserId,
  PaymentQueryRepository,
} from '@oumi-package/movement/lib/domain';
import { Oumi } from '@oumi-package/shared/lib/core';

import { TaskEither } from 'fp-ts/lib/TaskEither';
import { Connection } from 'typeorm';

import { SERVICE_ID } from '../../config';

export class TypeORMPaymentQueryRepository implements PaymentQueryRepository {
  /* tslint:disable:no-unused-variable */
  private readonly _connection: Connection;

  public constructor(container: Oumi.Container) {
    this._connection = container
      .get<Oumi.Database>(SERVICE_ID.DB)
      .connection<Connection>();
  }

  public ofDebtId(id: PaymentDebtId): TaskEither<null, PaymentDebt> {
    throw new Error('Method not implemented.');
  }

  public allChargesOfId(id: PaymentDebtUserId): TaskEither<null, Payment[]> {
    throw new Error('Method not implemented.');
  }

  public allOfId(id: PaymentDebtUserId): TaskEither<null, Payment[]> {
    throw new Error('Method not implemented.');
  }
}
