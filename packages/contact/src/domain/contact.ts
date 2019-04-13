import { AggregateRoot } from '@oumi-package/core/lib';

import { ContactDebt, ContactRequest } from '.';
import { ContactDomainError } from './contact.errors';
import { newRequested } from './contact.events';
import {
  ContactFirstname,
  contactFullnameVO,
  ContactId,
  ContactLastname,
  ContactMessage,
  ContactNickname,
  contactRequestStatusVO,
} from './contact.props';

export interface ContactConstructor {
  debts: ContactDebt[];
  firstname: ContactFirstname;
  id: ContactId;
  lastname: ContactLastname;
  nickname: ContactNickname;
  requests: ContactRequest[];
}

export class Contact extends AggregateRoot<any> {
  private _requests: ContactRequest[];
  private _debts: ContactDebt[];
  private _firstname: ContactFirstname;
  private _id: ContactId;
  private _lastname: ContactLastname;
  private _nickname: ContactNickname;

  constructor(args: ContactConstructor) {
    super();

    this._debts = args.debts;
    this._firstname = args.firstname;
    this._id = args.id;
    this._lastname = args.lastname;
    this._nickname = args.nickname;
    this._requests = args.requests;
  }

  public newRequest(contact: Contact, message: ContactMessage): void {
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
      fullname: contactFullnameVO({
        firstname: contact._firstname.value,
        lastname: contact._lastname.value,
      }),
      id: contact._id,
      message,
      nickname: contact._nickname,
      status: contactRequestStatusVO('SENDED'),
    });

    contact._requests.push({
      fullname: contactFullnameVO({
        firstname: this._firstname.value,
        lastname: this._lastname.value,
      }),
      id: this._id,
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

  get id(): ContactId {
    return this._id;
  }

  get firstname(): ContactFirstname {
    return this._firstname;
  }

  get lastname(): ContactLastname {
    return this._lastname;
  }

  get nickname(): ContactNickname {
    return this._nickname;
  }
}
