import { Debt, DebtCommandRepository } from '@oumi-package/movement/lib/domain';
import { Oumi } from '@oumi-package/shared/lib/core';

import { Connection, EntitySchema } from 'typeorm';

import { SERVICE_ID } from '../../config';
import {
  DebtDebtorEntity,
  DebtDebtorEntityType,
  DebtEntity,
  DebtLoanerEntity,
  DebtLoanerEntityType,
  DebtStatusEntity,
  DebtStatusEntityType,
} from '../../config/typeorm/entity';
import {
  CurrencyEntity,
  CurrencyEntityType,
} from '../../config/typeorm/entity/currency';

type DebtUserEntity = EntitySchema<DebtDebtorEntityType | DebtLoanerEntityType>;

export class TypeORMDebtCommandRepository implements DebtCommandRepository {
  private readonly _connection: Connection;

  public constructor(container: Oumi.Container) {
    this._connection = container
      .get<Oumi.Database>(SERVICE_ID.DB)
      .connection<Connection>();
  }

  public confirmDebtRequest(debt: Debt): Promise<void> {
    return this._updateDebtStatus(debt);
  }

  public async create(debt: Debt): Promise<void> {
    const currency = await this._getCurrencyOfCode(
      debt.amount.value.currency.code,
    );

    await this._insertDebt(debt, currency);

    await this._insertDebtUsers(debt);
  }

  public denyDebtRequest(debt: Debt): Promise<void> {
    return this._updateDebtStatus(debt);
  }

  public endDebt(debt: Debt): Promise<void> {
    return this._updateDebtStatus(debt);
  }

  private _insertDebt(debt: Debt, currency: CurrencyEntityType) {
    return this._connection
      .createQueryBuilder()
      .insert()
      .into(DebtEntity)
      .values({
        amount: debt.amount.value.amount,
        concept: debt.concept.value,
        currencyId: currency.id,
        id: debt.id.value,
        initialDate: debt.initialDate.value,
        limitDate: debt.limitDate.value,
      })
      .execute();
  }

  private async _insertDebtUsers(debt: Debt) {
    const debtorDebtStatus = await this._getDebtStatusOfStatus(
      debt.debtor.status,
    );

    await this._insertDebtUser(DebtDebtorEntity, debt, debtorDebtStatus);

    const loanerDebtStatus = await this._getDebtStatusOfStatus(
      debt.loaner.status,
    );

    await this._insertDebtUser(DebtLoanerEntity, debt, loanerDebtStatus);
  }

  private _updateDebtUser(
    entity: DebtUserEntity,
    debt: Debt,
    debtStatus: DebtStatusEntityType,
  ) {
    return this._connection
      .createQueryBuilder()
      .update(entity)
      .set({
        debtStatusId: debtStatus.id,
      })
      .where('debt_id = :debtId', {
        debtId: debt.id.value,
      })
      .andWhere('user_id = :userId', {
        userId: this._getDebtUserIdOfEntity(entity, debt),
      })
      .execute();
  }

  private async _updateDebtStatus(debt: Debt) {
    const debtorDebtStatus = await this._getDebtStatusOfStatus(
      debt.debtor.status,
    );
    await this._updateDebtUser(DebtDebtorEntity, debt, debtorDebtStatus);
    const loanerDebtStatus = await this._getDebtStatusOfStatus(
      debt.loaner.status,
    );
    await this._updateDebtUser(DebtLoanerEntity, debt, loanerDebtStatus);
  }

  private _getCurrencyOfCode(code: string) {
    return this._connection.getRepository(CurrencyEntity).findOneOrFail({
      cache: true,
      where: {
        code,
      },
    });
  }

  private _insertDebtUser(
    entity: DebtUserEntity,
    debt: Debt,
    debtStatus: DebtStatusEntityType,
  ) {
    return this._connection
      .createQueryBuilder()
      .insert()
      .into(entity)
      .values({
        debtId: debt.id.value,
        debtStatusId: debtStatus.id,
        userId: this._getDebtUserIdOfEntity(entity, debt),
      })
      .execute();
  }

  private _getDebtStatusOfStatus(status: string) {
    return this._connection.getRepository(DebtStatusEntity).findOneOrFail({
      cache: true,
      where: {
        status,
      },
    });
  }

  private _getDebtUserIdOfEntity(entity: DebtUserEntity, debt: Debt): string {
    return entity.options.name === 'debt_debtor'
      ? debt.debtor.id.value
      : debt.loaner.id.value;
  }
}
