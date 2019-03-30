import { Oumi } from '@oumi-package/core/lib';
import {
  User,
  UserEmail,
  userEmailVO,
  userFirstnameVO,
  UserId,
  userIdVO,
  userLastnameVO,
  userNicknameVO,
  userPasswordVO,
  userPhoneVO,
  UserQueryRepository,
} from '@oumi-package/user/lib';

import { TaskEither, tryCatch } from 'fp-ts/lib/TaskEither';
import { Connection, Repository } from 'typeorm';

import { SERVICE_ID } from '../../config';
import { UserEntity, UserEntityType } from '../../entity/typeorm';

export class TypeORMUserQueryRepository implements UserQueryRepository {
  private readonly _repository: Repository<UserEntityType>;

  public constructor(container: Oumi.Container) {
    this._repository = container
      .get<Oumi.Database>(SERVICE_ID.DB.WRITE)
      .connection<Connection>()
      .getRepository(UserEntity);
  }

  public ofEmail(email: UserEmail): TaskEither<null, User> {
    return tryCatch(
      () =>
        this._repository
          .findOneOrFail({
            where: { email: email.value },
          })
          .then(rawUser => this._map(rawUser)),
      () => null,
    );
  }

  public ofId(id: UserId): TaskEither<null, User> {
    return tryCatch(
      () =>
        this._repository
          .findOneOrFail(id.value)
          .then(rawUser => this._map(rawUser)),
      () => null,
    );
  }

  private _map(data: UserEntityType): User {
    return new User({
      email: userEmailVO(data.email),
      firstname: userFirstnameVO(data.firstname),
      id: userIdVO(data.id),
      lastname: userLastnameVO(data.lastname),
      nickname: userNicknameVO(data.nickname),
      password: userPasswordVO(data.password, false),
      phone: userPhoneVO(data.phone),
    });
  }
}
