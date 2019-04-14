import { AggregateRoot } from '@oumi-package/core/lib';

import {
  CONTACT_REQUEST_CONFIRMED_STATUS,
  CONTACT_REQUEST_REFUSED_STATUS,
  ContactDebt,
  ContactDomainError,
  ContactEvents,
  ContactFirstname,
  contactFullnameVO,
  ContactId,
  ContactLastname,
  ContactMessage,
  ContactNickname,
  ContactRequest,
  contactRequestStatusVO,
  newRequested,
  requestConfirmed,
  requestDenied,
} from '.';

export interface ContactConstructor {
  debts: ContactDebt[];
  firstname: ContactFirstname;
  id: ContactId;
  lastname: ContactLastname;
  nickname: ContactNickname;
  requests: ContactRequest[];
}

export class Contact extends AggregateRoot<ContactEvents> {
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

  public confirmRequest(requester: Contact): void {
    const index = this.findContactRequestIndexOrFail(requester.id);
    this.guardContactRequestAlreadyConfirmed(this._requests[index]);

    const requesterIndex = requester.findContactRequestIndexOrFail(this._id);
    requester.guardContactRequestAlreadyConfirmed(
      requester._requests[requesterIndex],
    );

    this._requests[index].status = contactRequestStatusVO(
      CONTACT_REQUEST_CONFIRMED_STATUS,
    );
    requester._requests[requesterIndex].status = contactRequestStatusVO(
      CONTACT_REQUEST_CONFIRMED_STATUS,
    );

    this.recordDomainEvent(
      requestConfirmed({
        contactId: this._id.value,
        requesterId: requester._id.value,
      }),
    );
  }

  public denyRequest(requester: Contact) {
    const index = this.findContactRequestIndexOrFail(requester.id);
    this.guardContactRequestAlreadyDeny(this._requests[index]);

    const requesterIndex = requester.findContactRequestIndexOrFail(this._id);
    requester.guardContactRequestAlreadyDeny(
      requester._requests[requesterIndex],
    );

    this._requests[index].status = contactRequestStatusVO(
      CONTACT_REQUEST_REFUSED_STATUS,
    );
    requester._requests[requesterIndex].status = contactRequestStatusVO(
      CONTACT_REQUEST_REFUSED_STATUS,
    );

    this.recordDomainEvent(
      requestDenied({
        contactId: this._id.value,
        requesterId: requester._id.value,
      }),
    );
  }

  private findContactRequestIndexOrFail(id: ContactId) {
    const index = this._requests.findIndex(request => request.id.equalsTo(id));

    if (index === -1) {
      throw ContactDomainError.requestNotFound(id.value);
    }

    return index;
  }

  private guardContactRequestAlreadyConfirmed(contactRequest: ContactRequest) {
    if (contactRequest.status.value === CONTACT_REQUEST_CONFIRMED_STATUS) {
      throw ContactDomainError.requestAlreadyConfirmed(
        contactRequest.id.value,
        this._id.value,
      );
    }
  }

  private guardContactRequestAlreadyDeny(contactRequest: ContactRequest) {
    if (contactRequest.status.value === CONTACT_REQUEST_REFUSED_STATUS) {
      throw ContactDomainError.requestAlreadyDenied(
        contactRequest.id.value,
        this._id.value,
      );
    }
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
