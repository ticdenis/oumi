import { Oumi } from "@oumi-package/shared/lib/core";
import {
  User,
  UserEmail,
  UserId,
  UserQueryRepository
} from "@oumi-package/user/lib";
import { jsonUserMapper } from "@oumi-package/user/lib/infrastructure/user.mapper";

import { TaskEither, tryCatch } from "fp-ts/lib/TaskEither";
import { Connection, Repository } from "typeorm";

import { SERVICE_ID } from "../../config";
import { UserEntity, UserEntityType } from "../../config/typeorm/entity";

export class TypeORMUserQueryRepository implements UserQueryRepository {
  private readonly _repository: Repository<UserEntityType>;

  public constructor(container: Oumi.Container) {
    this._repository = container
      .get<Oumi.Database>(SERVICE_ID.DB)
      .connection<Connection>()
      .getRepository(UserEntity);
  }

  public ofEmail(email: UserEmail): TaskEither<null, User> {
    return tryCatch(
      () =>
        this._repository
          .findOneOrFail({
            where: { email: email.value }
          })
          .then(jsonUserMapper.item),
      () => null
    );
  }

  public ofId(id: UserId): TaskEither<null, User> {
    return tryCatch(
      () => this._repository.findOneOrFail(id.value).then(jsonUserMapper.item),
      () => null
    );
  }
}
