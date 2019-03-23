import { Oumi } from '@oumi-package/core';
import { User, UserCommandRepository } from '@oumi-package/user';

import { Connection, EntityManager } from 'typeorm';

import { SERVICE_ID } from '../../config';
import { UserEntity } from '../../entity/typeorm';

export class TypeORMUserCommandRepository implements UserCommandRepository {
  private readonly _entityManager: EntityManager;

  public constructor(container: Oumi.Container) {
    this._entityManager = container
      .get<Connection>(SERVICE_ID.DB.WRITE)
      .createEntityManager();
  }

  public async create(user: User): Promise<void> {
    await this._entityManager.insert(UserEntity, {
      email: user.email.value,
      firstname: user.firstname.value,
      id: user.id.value,
      lastname: user.lastname.value,
      nickname: user.nickname.value,
      password: user.password.value,
    });
  }
}
