import {
  Payment,
  PaymentCommandRepository,
} from '@oumi-package/movement/lib/domain';
import { Oumi } from '@oumi-package/shared/lib/core';

import { Connection } from 'typeorm';

import { SERVICE_ID } from '../../config';
import { PaymentEntity } from '../../config/typeorm/entity/payment';

export class TypeORMPaymentCommandRepository
  implements PaymentCommandRepository {
  private readonly _connection: Connection;

  public constructor(container: Oumi.Container) {
    this._connection = container
      .get<Oumi.Database>(SERVICE_ID.DB)
      .connection<Connection>();
  }

  public async create(payment: Payment): Promise<void> {
    await this._connection
      .createQueryBuilder()
      .insert()
      .into(PaymentEntity)
      .values({
        debtId: payment.debt.id.value,
        message: payment.message.value,
        occurredOn: payment.occurredOn.value,
        quantity: payment.quantity.value,
      })
      .execute();
  }
}
