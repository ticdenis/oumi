import { Contact, ContactQueryRepository } from '@oumi-package/contact';
import { jsonContactMapper } from '@oumi-package/contact/lib/infrastructure/contact.mapper';
import { Oumi } from '@oumi-package/core/lib';
import { UserId } from '@oumi-package/user/lib';

import { TaskEither, tryCatch } from 'fp-ts/lib/TaskEither';
import * as R from 'ramda';
import { Connection } from 'typeorm';

import { SERVICE_ID } from '../../config';

// tslint:disable-next-line: class-name
interface _Debt {
  amount: {
    amount: number;
    currency: {
      code: string;
      currency: string;
    };
  };
  id: string;
}

// tslint:disable-next-line: class-name
interface _Contact {
  debts: _Debt[];
  firstname: string;
  id: string;
  lastname: string;
  nickname: string;
}

export class TypeORMContactQueryRepository implements ContactQueryRepository {
  private readonly _connection: Connection;

  public constructor(container: Oumi.Container) {
    this._connection = container
      .get<Oumi.Database>(SERVICE_ID.DB)
      .connection<Connection>();
  }

  public allOfId(id: UserId): TaskEither<null, Contact[]> {
    return tryCatch(
      async () =>
        R.pipe(
          this._getUserContacts,
          R.then(
            R.map(async contact => {
              contact.debts = await this._getUserContactDebts(
                id.value,
                contact.id,
              );
              return contact;
            }),
          ),
          R.then(jsonContactMapper.items),
        )(id.value),
      () => null,
    );
  }

  private _getUserContacts(id: string): Promise<_Contact[]> {
    return this._connection
      .createQueryBuilder()
      .select(['u.firstname', 'u.id', 'u.lastname', 'u.nickname'])
      .from('contacts', 'c')
      .innerJoin('users', 'u', 'u.id = c.contact_id')
      .where('c.user_id = :id', [id])
      .execute();
  }

  private async _getUserContactDebts(
    userId: string,
    contactId: string,
  ): Promise<_Debt[]> {
    const debts: any[] = await this._connection
      .createQueryBuilder()
      .select(['d.amount', 'd.code', 'd.currency'])
      .from('debts', 'd')
      .where('d.user_id = :userId', {
        userId,
      })
      .andWhere('d.contact_id = :contactId', {
        contactId,
      })
      .execute();

    return debts.map(debt => ({
      amount: {
        amount: debt.amount,
        currency: {
          code: debt.code,
          currency: debt.currency,
        },
      },
      id: userId,
    }));
  }
}
