import { User, UserEmail, UserQueryRepository } from '@oumi-package/user/lib';

import { Connection, Repository } from 'typeorm';

import { Container, SERVICE_ID } from '../dsl';
import { UserEntity } from '../entity';

export class TypeORMUserQueryRepository implements UserQueryRepository {
  private readonly _repository: Repository<any>;

  public constructor(container: Container) {
    const connection = container.get<Connection>(SERVICE_ID.DB);

    this._repository = connection.getRepository(UserEntity);
  }

  public async ofEmail(email: UserEmail): Promise<User> {
    const user = await this._repository.findOne({
      where: { email: email.value },
    });

    return undefined === user ? null : user;
  }
}
