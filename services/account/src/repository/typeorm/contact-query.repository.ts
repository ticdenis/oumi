import { Contact, ContactQueryRepository } from '@oumi-package/contact';
import { jsonContactMapper } from '@oumi-package/contact/lib/infrastructure/contact.mapper';
import { Oumi } from '@oumi-package/core/lib';
import { UserId } from '@oumi-package/user/lib';

import { TaskEither, tryCatch } from 'fp-ts/lib/TaskEither';
import { Connection, Repository } from 'typeorm';

import { SERVICE_ID } from '../../config';
import { ContactEntity, ContactEntityType } from '../../entity/typeorm';

export class TypeORMContactQueryRepository implements ContactQueryRepository {
  private readonly _repository: Repository<ContactEntityType>;

  public constructor(container: Oumi.Container) {
    this._repository = container
      .get<Oumi.Database>(SERVICE_ID.DB)
      .connection<Connection>()
      .getRepository(ContactEntity);
  }

  public allOfId(id: UserId): TaskEither<null, Contact[]> {
    return tryCatch(
      () =>
        this._repository
          .find({
            relations: ['userId'],
            where: {
              contactId: id.value,
            },
          })
          .then(jsonContactMapper.items),
      () => null,
    );
  }
}
