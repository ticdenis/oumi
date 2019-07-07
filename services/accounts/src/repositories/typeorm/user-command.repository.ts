import { Oumi } from '@oumi-package/shared/lib/core';
import { User, UserCommandRepository } from '@oumi-package/user/lib';

import { Connection } from 'typeorm';

import { SERVICE_ID } from '../../config';
import { UserEntity } from '../../config/typeorm/entity';

export class TypeORMUserCommandRepository implements UserCommandRepository {
  private readonly _connection: Connection;

  public constructor(container: Oumi.Container) {
    this._connection = container
      .get<Oumi.Database>(SERVICE_ID.DB)
      .connection<Connection>();

    (this._connection.options as any).schema = 'accounts';
  }

  public async create(user: User): Promise<void> {
    await this._connection
      .createQueryBuilder()
      .insert()
      .into(UserEntity)
      .values({
        created_at: new Date(),
        email: user.email.value,
        firstname: user.firstname.value,
        id: user.id.value,
        lastname: user.lastname.value,
        nickname: user.nickname.value,
        password: user.password.value,
        phone: user.phone.value,
        updated_at: new Date()
      })
      .execute();
  }

  public async updatePassword(user: User): Promise<void> {
    await this._connection
      .createQueryBuilder()
      .update(UserEntity)
      .set({
        password: user.password.value
      })
      .where('id = :id', {
        id: user.id.value,
      })
      .execute();
  }

  public async updateProfile(user: User): Promise<void> {
    await this._connection
      .createQueryBuilder()
      .update(UserEntity)
      .set({
        firstname: user.firstname.value,
        lastname: user.lastname.value,
        nickname: user.nickname.value,
        phone: user.phone.value
      })
      .where('id = :id', {
        id: user.id.value,
      })
      .execute();
  }
}
