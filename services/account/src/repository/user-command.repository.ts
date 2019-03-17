import { User, UserCommandRepository } from '@oumi-package/user/lib';

import { Connection, EntityManager } from 'typeorm';

import { Container, SERVICE_ID } from '../dsl';
import { UserEntity } from '../entity';

export class TypeORMUserCommandRepository implements UserCommandRepository {
  private readonly _entityManager: EntityManager;

  public constructor(container: Container) {
    this._entityManager = container
      .get<Connection>(SERVICE_ID.DB)
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
