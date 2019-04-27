import { Contact, ContactCommandRepository } from '@oumi-package/contact';
import { Oumi } from '@oumi-package/shared/lib/core';

import { Connection } from 'typeorm';

import { SERVICE_ID } from '../../config';
import { ContactEntity } from '../../config/typeorm/entity/contact';

export class TypeORMContactCommandRepository
  implements ContactCommandRepository {
  private readonly _connection: Connection;

  public constructor(container: Oumi.Container) {
    this._connection = container
      .get<Oumi.Database>(SERVICE_ID.DB)
      .connection<Connection>();
  }

  public async confirmRequest(
    contact: Contact,
    requester: Contact,
  ): Promise<void> {
    const preparePayload = (from: Contact, to: Contact) => {
      const request = from.requests.find(req => req.id.equalsTo(to.id));
      return {
        contactId: to.id.value,
        status: request.status.value,
        userId: from.id.value,
      };
    };

    await this._updateContact(preparePayload(requester, contact));

    await this._updateContact(preparePayload(contact, requester));
  }

  public async denyRequest(
    contact: Contact,
    requester: Contact,
  ): Promise<void> {
    const preparePayload = (from: Contact, to: Contact) => {
      const request = from.requests.find(req => req.id.equalsTo(to.id));
      return {
        contactId: to.id.value,
        status: request.status.value,
        userId: from.id.value,
      };
    };

    await this._updateContact(preparePayload(requester, contact));

    await this._updateContact(preparePayload(contact, requester));
  }

  public async newRequest(requester: Contact, contact: Contact): Promise<void> {
    const preparePayload = (from: Contact, to: Contact) => {
      const request = from.requests.find(req => req.id.equalsTo(to.id));
      return {
        contactId: to.id.value,
        message: request.message.value,
        status: request.status.value,
        userId: from.id.value,
      };
    };

    await this._insertContact(preparePayload(requester, contact));

    await this._insertContact(preparePayload(contact, requester));
  }

  private _updateContact(values: {
    contactId: string;
    userId: string;
    status: string;
  }) {
    return this._connection
      .createQueryBuilder()
      .update(ContactEntity)
      .set({
        status: values.status,
      })
      .where('contact_id = :contactId', {
        contactId: values.contactId,
      })
      .andWhere('user_id = :requesterId', {
        requesterId: values.userId,
      })
      .execute();
  }

  private _insertContact(values: {
    contactId: string;
    message: string | null;
    status: string;
    userId: string;
  }) {
    return this._connection
      .createQueryBuilder()
      .insert()
      .into(ContactEntity)
      .values(values)
      .execute();
  }
}
