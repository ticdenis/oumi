import { Oumi } from '@oumi-package/core';
import { User, UserEmail, UserQueryRepository } from '@oumi-package/user';

import { Connection, Repository } from 'typeorm';

import { SERVICE_ID } from '../../config';
import { UserEntity } from '../../entity/typeorm';

export class TypeORMUserQueryRepository implements UserQueryRepository {
  private readonly _repository: Repository<any>;

  public constructor(container: Oumi.Container) {
    this._repository = container
      .get<Connection>(SERVICE_ID.DB.WRITE)
      .getRepository(UserEntity);
  }

  public async ofEmail(email: UserEmail): Promise<User> {
    const user = await this._repository.findOne({
      where: { email: email.value },
    });

    return undefined === user ? null : user;
  }
}
