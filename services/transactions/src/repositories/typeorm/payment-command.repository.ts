import {
  Payment,
  PaymentCommandRepository,
} from '@oumi-package/payment/lib/domain';
import { Oumi } from '@oumi-package/shared/lib/core';

import { Connection } from 'typeorm';

import { SERVICE_ID } from '../../config';

export class TypeORMPaymentCommandRepository
  implements PaymentCommandRepository {
  /* tslint:disable:no-unused-variable */
  private readonly _connection: Connection;

  public constructor(container: Oumi.Container) {
    this._connection = container
      .get<Oumi.Database>(SERVICE_ID.DB)
      .connection<Connection>();
  }

  public create(payment: Payment): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
