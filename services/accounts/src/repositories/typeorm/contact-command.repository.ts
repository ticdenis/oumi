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

  public confirmRequest(contact: Contact, requester: Contact): Promise<void> {
    throw new Error('Method not implemented.');
  }

  public denyRequest(contact: Contact, requester: Contact): Promise<void> {
    throw new Error('Method not implemented.');
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
