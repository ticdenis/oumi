import {
  Contact,
  ContactQueryRepository,
  jsonContactMapper,
} from '@oumi-package/contact/lib';
import { Oumi } from '@oumi-package/core/lib';
import { UserId, UserNickname } from '@oumi-package/user/lib';

import { TaskEither, tryCatch } from 'fp-ts/lib/TaskEither';
import * as R from 'ramda';
import { Connection } from 'typeorm';

import { SERVICE_ID } from '../../config';

export class TypeORMContactQueryRepository implements ContactQueryRepository {
  private readonly _connection: Connection;

  public constructor(container: Oumi.Container) {
    this._connection = container
      .get<Oumi.Database>(SERVICE_ID.DB)
      .connection<Connection>();
  }

  public allOfId(id: UserId): TaskEither<null, Contact[]> {
    return tryCatch(
      R.pipe(
        () => this._getUserContacts(id.value),
        R.then(
          R.map(async contact => {
            contact.debts = await this._getUserContactDebts(
              id.value,
              contact.id,
            );
            return contact;
          }),
        ),
        R.then(promises => Promise.all(promises)),
        R.then(jsonContactMapper.items),
      ),
      () => null,
    );
  }

  public ofId(id: UserId): TaskEither<null, Contact> {
    throw new Error('Method not implemented.');
  }
  public ofNickname(nickname: UserNickname): TaskEither<null, Contact> {
    throw new Error('Method not implemented.');
  }

  private _getUserContacts(id: string): Promise<_Contact[]> {
    return this._connection
      .createQueryBuilder()
      .select([
        'u.firstname as firstname',
        'u.id as id',
        'u.lastname as lastname',
        'u.nickname as nickname',
      ])
      .from('contacts', 'c')
      .innerJoin('users', 'u', 'u.id = c.contact_id')
      .where('c.user_id = :id', { id })
      .execute();
  }

  private async _getUserContactDebts(
    userId: string,
    contactId: string,
  ): Promise<_Debt[]> {
    const debts: any[] = await this._connection
      .createQueryBuilder()
      .select([
        'd.amount as amount',
        'd.code as code',
        'd.currency as currency',
      ])
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
