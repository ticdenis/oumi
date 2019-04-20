import {
  Contact,
  ContactQueryRepository,
  jsonContactMapper,
} from '@oumi-package/contact/lib';
import { Oumi } from '@oumi-package/shared/lib/core';
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
            contact.requests = await this._getContactRequest(contact.id);
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
    return tryCatch(
      R.pipe(
        () => this._getContactOfId(id.value),
        R.then(async (contact: _Contact) => {
          contact.debts = await this._getContactDebts(contact.id);
          contact.requests = await this._getContactRequest(contact.id);
          return contact;
        }),
        R.then(contact => {
          // tslint:disable-next-line: no-console
          console.log(contact);
          return jsonContactMapper.item(contact);
        }),
      ),
      () => null,
    );
  }

  public ofNickname(nickname: UserNickname): TaskEither<null, Contact> {
    return tryCatch(
      R.pipe(
        () => this._getContactOfNickname(nickname.value),
        R.then(async (contact: _Contact) => {
          contact.debts = await this._getContactDebts(contact.id);
          contact.requests = await this._getContactRequest(contact.id);
          return contact;
        }),
        R.then(jsonContactMapper.item),
      ),
      () => null,
    );
  }

  // tslint:disable-next-line: function-name
  private _getContactRequest(userId: string): Promise<_Request[]> {
    return this._connection
      .createQueryBuilder()
      .select([
        'u.firstname as firstname',
        'u.id as id',
        'u.lastname as lastname',
        'u.nickname as nickname',
        'c.message as message',
        'c.status as status',
      ])
      .from('contacts', 'c')
      .innerJoin('users', 'u', 'u.id = c.contact_id')
      .where('c.user_id = :userId', { userId })
      .execute()
      .then(
        R.map(
          R.pipe(
            (contact: {
              firstname: string;
              lastname: string;
              fullname?: string;
            }) => {
              contact.fullname = `${contact.firstname} ${contact.lastname}`;
              return contact;
            },
            R.omit(['firstname', 'lastname']),
          ),
        ),
      ) as any;
  }
  // tslint:disable-next-line: function-name
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

  // tslint:disable-next-line: function-name
  private _getContactOfId(id: string): Promise<_Contact> {
    return this._connection
      .createQueryBuilder()
      .select([
        'u.firstname as firstname',
        'u.id as id',
        'u.lastname as lastname',
        'u.nickname as nickname',
      ])
      .from('users', 'u')
      .where('u.id = :id', { id })
      .limit(1)
      .execute()
      .then(contacts => contacts[0]);
  }

  // tslint:disable-next-line: function-name
  private _getContactOfNickname(nickname: string): Promise<_Contact> {
    return this._connection
      .createQueryBuilder()
      .select([
        'u.firstname as firstname',
        'u.id as id',
        'u.lastname as lastname',
        'u.nickname as nickname',
      ])
      .from('users', 'u')
      .where('u.nickname = :nickname', { nickname })
      .limit(1)
      .execute()
      .then(contacts => contacts[0]);
  }

  // tslint:disable-next-line: function-name
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

    return debts.map(this._mapContactDebt(userId));
  }

  // tslint:disable-next-line: function-name
  private _mapContactDebt = (userId: string) => (debt: any) => {
    return {
      amount: {
        amount: debt.amount,
        currency: {
          code: debt.code,
          currency: debt.currency,
        },
      },
      id: userId,
    };
  };

  // tslint:disable-next-line: function-name
  private async _getContactDebts(userId: string): Promise<_Debt[]> {
    const debts: any[] = await this._connection
      .createQueryBuilder()
      .select([
        'd.amount as amount',
        'd.code as code',
        'd.currency as currency',
      ])
      .from('debts', 'd')
      .where('d.contact_id = :userId', {
        userId,
      })
      .execute();

    return debts.map(this._mapContactDebt(userId));
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
interface _Request {
  id: string;
  fullname: string;
  nickname: string;
  message: string | null;
  status: string;
}

// tslint:disable-next-line: class-name
interface _Contact {
  debts: _Debt[];
  requests: _Request[];
  firstname: string;
  id: string;
  lastname: string;
  nickname: string;
}
