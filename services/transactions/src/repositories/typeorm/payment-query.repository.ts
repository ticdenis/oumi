import {
  Payment,
  PaymentDebt,
  PaymentDebtId,
  PaymentDebtUserId,
  PaymentQueryRepository,
} from '@oumi-package/movement/lib/domain';
import { jsonPaymentMapper } from '@oumi-package/movement/lib/infrastructure';
import { Oumi } from '@oumi-package/shared/lib/core';

import { TaskEither, tryCatch } from 'fp-ts/lib/TaskEither';
import * as R from 'ramda';
import { Connection } from 'typeorm';

import { SERVICE_ID } from '../../config';
import {
  DebtDebtorEntity,
  DebtEntity,
  DebtLoanerEntity,
} from '../../config/typeorm/entity';
import { PaymentEntity } from '../../config/typeorm/entity/payment';

const DEFAULT_SELECT_FIELDS = [
  'p.id as id',
  'p.message as message',
  'p.occurred_on as occurredOn',
  'p.quantity as quantity',
  'dd.user_id as debtorId',
  'd.amount as debtAmount',
  'd.id as debtId',
  'dl.user_id as loanerId',
];

const DEFAULT_IGNORE_SELECTED_FIELDS = [
  'debtorId',
  'debtAmount',
  'debtId',
  'loanerId',
];

export class TypeORMPaymentQueryRepository implements PaymentQueryRepository {
  private readonly _connection: Connection;

  public constructor(container: Oumi.Container) {
    this._connection = container
      .get<Oumi.Database>(SERVICE_ID.DB)
      .connection<Connection>();
  }

  public ofDebtId(id: PaymentDebtId): TaskEither<null, PaymentDebt> {
    return tryCatch(() => this._getPaymentDebtOfId(id.value), () => null);
  }

  public allChargesOfId(id: PaymentDebtUserId): TaskEither<null, Payment[]> {
    return tryCatch(() => this._getChargesOfUserId(id.value), () => null);
  }

  public allOfId(id: PaymentDebtUserId): TaskEither<null, Payment[]> {
    return tryCatch(() => this._getPaymentsOfUserId(id.value), () => null);
  }

  private async _getPaymentDebtOfId(id: string): Promise<PaymentDebt> {
    const debts = await this._connection
      .createQueryBuilder()
      .select([
        'dd.user_id as debtorId',
        'd.id as debtId',
        'dl.user_id as loanerId',
        'd.amount as quantity',
      ])
      .from(DebtEntity.options.name, 'd')
      .innerJoin(DebtDebtorEntity.options.name, 'dd', 'd.id = dd.debt_id')
      .innerJoin(DebtLoanerEntity.options.name, 'dl', 'd.id = dl.debt_id')
      .where('d.id = :id', { id })
      .limit(1)
      .execute();

    return debts[0] as PaymentDebt;
  }

  private _getChargesOfUserId(id: string): Promise<Payment[]> {
    return this._connection
      .createQueryBuilder()
      .select(DEFAULT_SELECT_FIELDS)
      .from(PaymentEntity.options.name, 'p')
      .innerJoin(DebtDebtorEntity.options.name, 'dd', 'p.debt_id = dd.debt_id')
      .innerJoin(DebtLoanerEntity.options.name, 'dl', 'p.debt_id = dl.debt_id')
      .where('dl.user_id = :id', { id })
      .execute()
      .then(this._mapPayments());
  }

  private _getPaymentsOfUserId(id: string): Promise<Payment[]> {
    return this._connection
      .createQueryBuilder()
      .select(DEFAULT_SELECT_FIELDS)
      .from(PaymentEntity.options.name, 'p')
      .innerJoin(DebtDebtorEntity.options.name, 'dd', 'p.debt_id = dd.debt_id')
      .innerJoin(DebtLoanerEntity.options.name, 'dl', 'p.debt_id = dl.debt_id')
      .where('dd.user_id = :id', { id })
      .execute()
      .then(this._mapPayments());
  }

  private _mapPayments(): (payments: any[]) => Payment[] {
    return R.map(
      R.pipe(
        (payment: any) =>
          R.assoc(
            'debt',
            {
              debtorId: payment.debtorId,
              id: payment.debtId,
              loanerId: payment.loanerId,
              quantity: payment.debtAmount,
            },
            payment,
          ),
        R.omit(DEFAULT_IGNORE_SELECTED_FIELDS),
        jsonPaymentMapper.item,
      ),
    );
  }
}
