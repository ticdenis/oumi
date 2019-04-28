import { Debt, DebtCommandRepository } from '@oumi-package/debt/lib/domain';
import { Oumi } from '@oumi-package/shared/lib/core';

import { Connection } from 'typeorm';

import { SERVICE_ID } from '../../config';

export class TypeORMDebtCommandRepository implements DebtCommandRepository {
  /* tslint:disable:no-unused-variable */
  private readonly _connection: Connection;

  public constructor(container: Oumi.Container) {
    this._connection = container
      .get<Oumi.Database>(SERVICE_ID.DB)
      .connection<Connection>();
  }

  public confirmDebtRequest(debt: Debt): Promise<void> {
    throw new Error('Method not implemented.');
  }

  public create(debt: Debt): Promise<void> {
    throw new Error('Method not implemented.');
  }

  public denyDebtRequest(debt: Debt): Promise<void> {
    throw new Error('Method not implemented.');
  }

  public endDebt(debt: Debt): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
