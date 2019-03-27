import { Oumi } from '@oumi-package/core/lib';
import {
  User,
  UserEmail,
  userEmailVO,
  userFirstnameVO,
  userIdVO,
  userLastnameVO,
  userNicknameVO,
  userPasswordVO,
  userPhoneVO,
  UserQueryRepository,
} from '@oumi-package/user/lib';

import { Connection, Repository } from 'typeorm';

import { SERVICE_ID } from '../../config';
import { UserEntity } from '../../entity/typeorm';

export class TypeORMUserQueryRepository implements UserQueryRepository {
  private readonly _repository: Repository<any>;

  public constructor(container: Oumi.Container) {
    this._repository = container
      .get<Oumi.Database>(SERVICE_ID.DB.WRITE)
      .connection<Connection>()
      .getRepository(UserEntity);
  }

  public async ofEmail(email: UserEmail): Promise<User> {
    const user = await this._repository.findOne({
      where: { email: email.value },
    });

    if (undefined === user) {
      return null;
    }

    return new User({
      email: userEmailVO(user.email),
      firstname: userFirstnameVO(user.firstname),
      id: userIdVO(user.id),
      lastname: userLastnameVO(user.lastname),
      nickname: userNicknameVO(user.nickname),
      password: userPasswordVO(user.password, false),
      phone: userPhoneVO(user.phone),
    });
  }
}
