import { Oumi } from '@oumi-package/core/lib';
import {
  UserCommandRepository,
  UserQueryRepository,
} from '@oumi-package/user/lib';

import { SERVICE_ID } from '..';
import {
  TypeORMUserCommandRepository,
  TypeORMUserQueryRepository,
} from '../../repository/typeorm';

export function loadRepositories(container: Oumi.Container) {
  container.set<UserCommandRepository>(
    SERVICE_ID.COMMAND_REPOSITORY.USER,
    new TypeORMUserCommandRepository(container),
  );

  container.set<UserQueryRepository>(
    SERVICE_ID.QUERY_REPOSITORY.USER,
    new TypeORMUserQueryRepository(container),
  );
}
