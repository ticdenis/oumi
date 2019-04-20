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
    const contactRequest = contact.requests.find(req =>
      req.id.equalsTo(requester.id),
    );
    const userRequest = requester.requests.find(req =>
      req.id.equalsTo(contact.id),
    );

    await this._insertContact({
      contactId: requester.id.value,
      message: contactRequest.message.value,
      status: contactRequest.status.value,
      userId: contact.id.value,
    });

    await this._insertContact({
      contactId: contact.id.value,
      message: userRequest.message.value,
      status: userRequest.status.value,
      userId: requester.id.value,
    });
  }

  // tslint:disable-next-line: function-name
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
