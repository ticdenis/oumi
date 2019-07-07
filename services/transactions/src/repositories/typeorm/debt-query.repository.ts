import {
  Debt,
  DEBT_PENDING_STATUS,
  DEBT_SENDED_STATUS,
  DebtorId,
  DebtQueryRepository,
  LoanerId,
} from '@oumi-package/movement/lib/domain';
import { jsonDebtMapper } from '@oumi-package/movement/lib/infrastructure';
import { Oumi } from '@oumi-package/shared/lib/core';
import { DebtId } from '@oumi-package/shared/lib/domain/debt.props';

import { TaskEither, tryCatch } from 'fp-ts/lib/TaskEither';
import * as R from 'ramda';
import { Connection, EntitySchema } from 'typeorm';

import { SERVICE_ID } from '../../config';
import {
  CurrencyEntity,
  CurrencyEntityType,
  DebtDebtorEntity,
  DebtDebtorEntityType,
  DebtEntity,
  DebtEntityType,
  DebtLoanerEntity,
  DebtLoanerEntityType,
  DebtStatusEntity,
  DebtStatusEntityType,
} from '../../config/typeorm/entity';

type DebtUserEntity = EntitySchema<DebtDebtorEntityType | DebtLoanerEntityType>;

const DEFAULT_SELECT_FIELDS = [
  'd.id as id',
  'd.amount as amount',
  'c.code as currency_code',
  'c.symbol as currency_symbol',
  'd.initial_date as initialDate',
  'd.limit_date as limitDate',
  'dl.user_id as loanerId',
  'dl.status as loanerStatusId',
  'dd.user_id as debtorId',
  'dd.status as debtorStatusId',
];

const DEFAULT_IGNORE_SELECTED_FIELDS = [
  'currency_code',
  'currency_symbol',
  'loanerId',
  'loanerStatusId',
  'debtorId',
  'debtorStatusId',
];
export class TypeORMDebtQueryRepository implements DebtQueryRepository {
  private readonly _connection: Connection;

  public constructor(container: Oumi.Container) {
    this._connection = container
      .get<Oumi.Database>(SERVICE_ID.DB)
      .connection<Connection>();
    (this._connection.options as any).schema = 'transactions';
  }

  public allOfIds(ids: DebtId[]): TaskEither<null, Debt[]> {
    return tryCatch(
      R.pipe(
        () => this._getDebtsOfIdsWithoutStatusNames(ids.map(id => id.value)),
        R.then(
          R.map(async (debt: any) => {
            debt.loaner.status = (await this._getDebtStatusOfId(
              debt.loaner.statusId,
            )).status;

            debt.loaner = R.omit(['statusId'], debt.loaner);

            debt.debtor.status = (await this._getDebtStatusOfId(
              debt.debtor.statusId,
            )).status;

            debt.debtor = R.omit(['statusId'], debt.debtor);

            return debt;
          }),
        ),
        R.then(promises => Promise.all(promises)),
        R.then(jsonDebtMapper.items),
      ),
      () => null,
    );
  }

  public debtorExists(id: DebtorId): Promise<boolean> {
    return this._debtUserExists(DebtDebtorEntity, id.value);
  }

  public loanerExists(id: LoanerId): Promise<boolean> {
    return this._debtUserExists(DebtLoanerEntity, id.value);
  }

  public ofId(id: DebtId): TaskEither<null, Debt> {
    return tryCatch(
      R.pipe(
        () => this._getDebtOfId(id.value),
        R.then(async (debt: any) => {
          debt.currency = await this._getCurrencyOfId(debt.currencyId);

          debt.debtor = await this._getDebtUserOfDebtId(
            DebtDebtorEntity,
            debt.id,
          );

          debt.loaner = await this._getDebtUserOfDebtId(
            DebtLoanerEntity,
            debt.id,
          );
          return debt;
        }),
        R.then(jsonDebtMapper.item),
      ),
      () => null,
    );
  }

  public async pendingRequestsOfDebtorId(id: DebtorId): Promise<Debt[]> {
    return this._connection
      .createQueryBuilder()
      .select(DEFAULT_SELECT_FIELDS)
      .from(DebtDebtorEntity.options.name, 'dd')
      .innerJoin(DebtEntity.options.name, 'd', 'd.id = dd.debt_id')
      .innerJoin(DebtStatusEntity.options.name, 'ds', 'ds.id = :statusId', {
        statusId: (await this._getDebtPendingStatus()).id,
      })
      .innerJoin(CurrencyEntity.options.name, 'c', 'c.id = d.currency_id')
      .innerJoin(DebtLoanerEntity.options.name, 'dl', 'd.id = dl.debt_id')
      .where('dd.user_id = :userId', { userId: id.value })
      .execute()
      .then(
        R.map(
          R.pipe(
            (debt: any) => {
              debt.currency = {
                code: debt.currency_code,
                symbol: debt.currency_symbol,
              };

              debt.loaner = {
                id: debt.loanerId,
                status: DEBT_SENDED_STATUS,
              };

              debt.debtor = {
                id: id.value,
                status: DEBT_PENDING_STATUS,
              };

              return debt;
            },
            R.omit(DEFAULT_IGNORE_SELECTED_FIELDS),
            jsonDebtMapper.item,
          ),
        ),
      ) as any;
  }

  private _getDebtsOfIdsWithoutStatusNames(ids: string[]) {
    return this._connection
      .createQueryBuilder()
      .select(DEFAULT_SELECT_FIELDS)
      .from(DebtEntity.options.name, 'd')
      .innerJoin(CurrencyEntity.options.name, 'c', 'c.id = d.currency_id')
      .innerJoin(DebtDebtorEntity.options.name, 'dd', 'd.id = dd.debt_id')
      .innerJoin(DebtLoanerEntity.options.name, 'dl', 'd.id = dl.debt_id')
      .whereInIds(ids)
      .execute()
      .then(
        R.map(
          R.pipe(
            (debt: any) => {
              debt.currency = {
                code: debt.currency_code,
                symbol: debt.currency_symbol,
              };

              debt.loaner = {
                id: debt.loanerId,
                statusId: debt.loanerStatusId,
              };

              debt.debtor = {
                id: debt.debtorId,
                statusId: debt.debtorStatusId,
              };

              return debt;
            },
            R.omit(DEFAULT_IGNORE_SELECTED_FIELDS),
          ),
        ),
      ) as any;
  }

  private _getCurrencyOfId(id: number): Promise<CurrencyEntityType> {
    return this._connection.getRepository(CurrencyEntity).findOneOrFail({
      cache: true,
      where: {
        id,
      },
    });
  }

  private _getDebtUserOfDebtId(
    entity: DebtUserEntity,
    debtId: number,
  ): Promise<DebtDebtorEntityType | DebtLoanerEntityType> {
    return this._connection.getRepository(entity).findOneOrFail({
      where: {
        debtId,
      },
    });
  }

  private _getDebtStatusOfId(id: number): Promise<DebtStatusEntityType> {
    return this._connection.getRepository(DebtStatusEntity).findOneOrFail(id);
  }

  private _getDebtPendingStatus(): Promise<DebtStatusEntityType> {
    return this._connection.getRepository(DebtStatusEntity).findOneOrFail({
      cache: true,
      where: { status: DEBT_PENDING_STATUS },
    });
  }

  private _getDebtOfId(id: string): Promise<DebtEntityType> {
    return this._connection.getRepository(DebtEntity).findOne(id);
  }

  private async _debtUserExists(
    entity: DebtUserEntity,
    userId: string,
  ): Promise<boolean> {
    const user = await this._connection.getRepository(entity).findOne({
      where: {
        userId,
      },
    });

    return user !== undefined;
  }
}
