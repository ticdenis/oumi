import { AggregateRoot } from '@oumi-package/core/lib';
import {
  UserFirstname,
  UserId,
  UserLastname,
  UserNickname,
} from '@oumi-package/shared/lib/domain/user.props';

import { ContactDebt } from '.';

export interface ContactConstructor {
  debts: ContactDebt[];
  firstname: UserFirstname;
  id: UserId;
  lastname: UserLastname;
  nickname: UserNickname;
}

export class Contact extends AggregateRoot<any> {
  private _debts: ContactDebt[];
  private _firstname: UserFirstname;
  private _id: UserId;
  private _lastname: UserLastname;
  private _nickname: UserNickname;

  constructor(args: ContactConstructor) {
    super();

    this._debts = args.debts;
    this._firstname = args.firstname;
    this._id = args.id;
    this._lastname = args.lastname;
    this._nickname = args.nickname;
  }

  get debts(): ContactDebt[] {
    return this._debts;
  }

  get id(): UserId {
    return this._id;
  }

  get firstname(): UserFirstname {
    return this._firstname;
  }

  get lastname(): UserLastname {
    return this._lastname;
  }

  get nickname(): UserNickname {
    return this._nickname;
  }
}
