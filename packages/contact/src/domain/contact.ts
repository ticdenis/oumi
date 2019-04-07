import { AggregateRoot, NullableStringVO } from '@oumi-package/core';
import {
  UserFirstname,
  UserId,
  UserLastname,
  UserNickname,
} from '@oumi-package/shared/lib/domain/user.props';

import { ContactDebt, ContactRequest } from '.';
import { ContactDomainError } from './contact.errors';
import { newRequested } from './contact.events';
import { contactRequestStatusVO } from './contact.props';

export interface ContactConstructor {
  debts: ContactDebt[];
  firstname: UserFirstname;
  id: UserId;
  lastname: UserLastname;
  nickname: UserNickname;
  requests: ContactRequest[];
}

export class Contact extends AggregateRoot<any> {
  private _requests: ContactRequest[];
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
    this._requests = args.requests;
  }

  public newRequest(contact: Contact, message: NullableStringVO): void {
    const requestExist = contact._requests.find(req =>
      req.nickname.equalsTo(this._nickname),
    );

    if (requestExist) {
      throw ContactDomainError.requestAlreadyExists(
        this._id.value,
        contact._id.value,
      );
    }

    this._requests.push({
      message,
      nickname: contact._nickname,
      status: contactRequestStatusVO('SENDED'),
    });

    contact._requests.push({
      message,
      nickname: this._nickname,
      status: contactRequestStatusVO('PENDING'),
    });

    this.recordDomainEvent(
      newRequested({
        contactId: contact._id.value,
        message: message.value,
        requesterId: this._id.value,
      }),
    );
  }

  get requests(): ContactRequest[] {
    return this._requests;
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
