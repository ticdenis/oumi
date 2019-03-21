import { Oumi } from '@oumi-package/core';
import {
  UserCommandRepository,
  UserQueryRepository,
} from '@oumi-package/user/lib';

import { SERVICE_ID } from '..';
import {
  TypeORMUserCommandRepository,
  TypeORMUserQueryRepository,
} from '../../repository';

export function loadRepositories(container: Oumi.Container) {
  container.set<UserCommandRepository>(
    SERVICE_ID.userCommandRepository,
    new TypeORMUserCommandRepository(container),
  );

  container.set<UserQueryRepository>(
    SERVICE_ID.userQueryRepository,
    new TypeORMUserQueryRepository(container),
  );
}
